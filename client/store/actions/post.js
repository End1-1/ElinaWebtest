export const FETCH_POST = "fetch_post";
export const FETCH_POSTS = "fetch_posts";
export const FETCH_POSTS_BY_SEARCH = "fetch_posts_by_search"; 
export const FETCH_POSTS_BY_SEARCH_REQUEST = "fetch_posts_by_search_request"; 
export const FETCH_POSTS_BY_SEARCH_RECEIVE = "fetch_posts_by_search_receive"; 

import getApolloClient from 'Apollo/apolloClient';
import get from 'lodash/get';
import { gql } from '@apollo/client';
export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const GET_POSTS = gql`
            query posts($count: Float, $filterType: String) {
                posts(count: $count, filterType: $filterType) {
                    items {
                        id
                        shopIds
                        title
                        image
                        content
                        tags
                        urlKey
                        metaDescription
                        author {
                            email
                            firstName
                            lastName
                        }
                        createdAt
                    }
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_POSTS,
            variables: {},
            fetchPolicy: "no-cache"
        })
        const items = get(data, ['posts', 'items'], []);
        await dispatch({
            type: FETCH_POSTS,
            payload: items
        })
    }
}