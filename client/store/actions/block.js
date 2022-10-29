export const FETCH_BLOCK = 'fetch_block';

import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { convertItemsToTreeWithChildren } from 'Helper/convertItemsToTree';

export const fetchBlock = (blockId) => {
    return async (dispatch, getState) => {
        const { currentLanguage } = getState().shop;
        const apolloClient = getApolloClient(getState());
    
        const GET_BLOCK = gql`
            query block($blockId: String!) {
                block(blockId: $blockId) {
                    id
                    name
                    contentType
                    contentHtml
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
                }
            }
        `;

        try {
            const { data } = await apolloClient.query({
                query: GET_BLOCK,
                variables: {
                    blockId: blockId
                },
                fetchPolicy: "no-cache"
            });
    
            const { block } = data;

            block.content = block.content.map(screenContent => {
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

            dispatch({
                type: FETCH_BLOCK,
                payload: { id: block.id, language: currentLanguage, data: block }
            });
        } catch (error) {
            // If backend says that page is not found, just do nothing
            if (error.message == 'BlockNotFound') {
                return false;
            }
        }
    }
}