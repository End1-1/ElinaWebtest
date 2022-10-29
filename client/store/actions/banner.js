export const FETCH_BANNER = 'fetch_banner';

export const FETCH_POSTS = 'fetch_posts';

export const FETCH_POSTS_BY_SEARCH = 'fetch_posts_by_search';

export const FETCH_POSTS_BY_SEARCH_REQUEST = 'fetch_posts_by_search_request';

export const FETCH_POSTS_BY_SEARCH_RECEIVE = 'fetch_posts_by_search_receive';

import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export const fetchBanner = (bannerId) => {
    return async (dispatch, getState) => {
        const { currentLanguage } = getState().shop;
        const apolloClient = getApolloClient(getState());
    
        const GET_BANNER = gql`
            query banner($id: ID!) {
                banner(id: $id) {
                    id
                    name
                    image
                    content
                    contentPosition
                    link
                    linkType
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_BANNER,
            variables: {
                id: bannerId
            },
            fetchPolicy: "no-cache"
        });

        const { banner: result } = data;

        dispatch({
            type: FETCH_BANNER,
            payload: { id: result.id, language: currentLanguage, data: result }
        });
    }
}