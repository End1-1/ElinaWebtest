export const FETCH_SLIDER = 'fetch_slider';

export const FETCH_POSTS = 'fetch_posts';

export const FETCH_POSTS_BY_SEARCH = 'fetch_posts_by_search';

export const FETCH_POSTS_BY_SEARCH_REQUEST = 'fetch_posts_by_search_request';

export const FETCH_POSTS_BY_SEARCH_RECEIVE = 'fetch_posts_by_search_receive';

import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export const fetchSlider = (sliderId) => {
    return async (dispatch, getState) => {
        const { currentLanguage } = getState().shop;
        const apolloClient = getApolloClient(getState());
    
        const GET_SHOP_SLIDER = gql`
            query slider($sliderId: String!) {
                slider(sliderId: $sliderId) {
                    id
                    name
                        slides {
                            id
                            name
                            image
                            content
                            contentPosition
                            link
                            linkType
                        }
                    }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_SHOP_SLIDER,
            variables: {
                sliderId: sliderId,
                params: {

                }
            },
            fetchPolicy: "no-cache"
        });

        const { slider: result } = data;

        dispatch({
            type: FETCH_SLIDER,
            payload: { id: result.id, language: currentLanguage, data: result }
        });
    }
}