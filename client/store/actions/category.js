export const FETCH_CATEGORIES_RESPONSE = 'fetch_categories_response';

export const FETCH_CATEGORIES_REQUEST = 'fetch_categories_request';

export const FETCH_CATEGORY_REQUEST = 'fetch_category_request';

export const FETCH_CATEGORY_RESPONSE = 'fetch_category_response';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export const fetchCategory = (categoryId) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_CATEGORY_REQUEST });
        const apolloClient = getApolloClient(getState());
        const { shop } = getState();
        const { currentShopId } = shop;

        const GET_SHOP_CATEGORY = gql`
            query adminGetShopCategory($shopId: String!, $categoryId: Int) {
                adminGetShopCategory(shopId: $shopId, categoryId: $categoryId) {
                    id
                    name
                    urlKey
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_SHOP_CATEGORY,
            variables: {
                shopId: currentShopId,
                categoryId: categoryId
            },
            fetchPolicy: "no-cache"
        });

        const { adminGetShopCategory } = data;

        dispatch({
            type: FETCH_CATEGORY_RESPONSE,
            payload: adminGetShopCategory
        });
    }
}