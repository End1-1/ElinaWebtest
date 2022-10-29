export const FETCH_PAGE = "FETCH_PAGE";
import { convertItemsToTreeWithChildren } from 'Helper/convertItemsToTree';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export const fetchPage = (pageId) => {
    return async (dispatch, getState) => {
        const { currentLanguage } = getState().shop;
        const apolloClient = getApolloClient(getState());
        const GET_PAGE = gql`
            query getPage($pageId: String!) {
                page(pageId: $pageId) {
                    id
                    name
                    content {
                        screenSize
                        content {
                            id
                            type
                            settings
                            parent
                            data
                            children
                        }
                    }
                    pageTitle
                    metaDescription
                }
            }
        `;

        try {
            const { data } = await apolloClient.query({
                query: GET_PAGE,
                variables: {
                    pageId
                },
                fetchPolicy: "no-cache"
            })

            const { page } = data;
            // For now, builder components settings will be jsonDecoded
            page.content = page.content.map(screenContent => {
                const settingsDecoded = screenContent.content.map(element => {
                    return {
                        ...element,
                        settings: JSON.parse(element.settings),
                        data: JSON.parse(element.data)
                    }
                });

                // We convert [] style elements to tree (we already have the logic of rendering such styled page)
                const tree = convertItemsToTreeWithChildren(settingsDecoded);
                return {
                    ...screenContent,
                    content: settingsDecoded,
                    contentTree: settingsDecoded.length && tree.length ? tree[0] : {}
                }
            })
            await dispatch({
                type: FETCH_PAGE,
                payload: {
                    id: page.id,
                    page,
                    language: currentLanguage
                }
            })
        } catch (error) {
            // If backend says that page is not found, just do nothing
            if (error.message == 'PageNotFound') {
                return false;
            }
        }
    }
}