import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { ProductWithOptionsFragment } from 'Fragments/productWithOptions.gql';

export const fetchProductSliderData = async (accountId, categoryId, currentShopId) => {
    const apolloClient = getApolloClient(null);
    
    const GET_CATEGORY_PRODUCTS = gql`
        query categoryProducts($categoryId: ID!, $params: CategoryProductsParamsInput) {
            categoryProducts(categoryId: $categoryId, params: $params) {
                products {
                    ... ProductWithOptionsFragment
                }
            }
        }
        ${ProductWithOptionsFragment}
    `;
    const { data } = await apolloClient.query({
        query: GET_CATEGORY_PRODUCTS,
        variables: {
            categoryId: categoryId,
            shopId: String(currentShopId),
            accountId,
            params: {
            }
        },
        fetchPolicy: "no-cache"
    });

    const { categoryProducts: result } = data;
    return result.products;
}