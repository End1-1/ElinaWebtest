export const FETCH_SLIDER_PRODUCTS = 'fetch_slider_products';

export const FETCH_CATEGORY_PRODUCTS_REQUEST = 'fetch_category_products_request';

export const FETCH_CATEGORY_PRODUCTS_RESPONSE = 'fetch_category_products_response';

export const FETCH_PRODUCT_REVIEWS_REQUEST = 'fetch_product_reviews_request';

export const FETCH_PRODUCT_REVIEWS_RESPONSE = 'fetch_product_reviews_response';

export const FETCH_PRODUCT_CHART = 'fetch_product_chart';

import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { ProductWithOptionsFragment } from 'Fragments/productWithOptions.gql';

export const fetchProductsForSlider = (params = {}) => {
    return async (dispatch, getState) => {
        const { categoryId, type } = params;
        const { currentShopId } = getState().shop;
        const apolloClient = getApolloClient(getState());
        if (type == 'bestsellers') {
            const GET_BESTSELLERS = gql`
                query products($type: String!) {
                    products(type: $type) {
                        ... ProductWithOptionsFragment
                    }
                }
                ${ProductWithOptionsFragment}
            `;
            const { data } = await apolloClient.query({
                query: GET_BESTSELLERS,
                variables: {
                    shopId: String(currentShopId),
                    type
                },
                fetchPolicy: "no-cache"
            });

            const { products: result } = data;
            dispatch({
                type: FETCH_SLIDER_PRODUCTS,
                payload: { id: 'bestsellers', products: result }
            });
        } else {
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
                    params: {
                        pageSize: 100,
                        sort: "date",
                        dir: 'desc'
                    }
                },
                fetchPolicy: "no-cache"
            });
            const { categoryProducts: result } = data;
            dispatch({
                type: FETCH_SLIDER_PRODUCTS,
                payload: { id: categoryId, products: result.products || [] }
            });
        }
    }
}

export const fetchProductReviews = (productId) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
    
        const GET_PRODUCT_REVIEWS = gql`
            query productReviews($productId: String!) {
                productReviews(productId: $productId) {
                    id
                    name
                    email
                    summary
                    review
                    rating
                    date
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_PRODUCT_REVIEWS,
            variables: {
                productId
            },
            fetchPolicy: "no-cache"
        });

        const { productReviews: reviews } = data;
        dispatch({
            type: FETCH_PRODUCT_REVIEWS_RESPONSE,
            payload: { productId, reviews: reviews }
        });
    }
}

export const fetchCategoryProducts = (categoryId, filters = {}, page = 1, params = {}) => {
    return async (dispatch, getState) => {
        const { perPage, sort, dir } = params;
        const { currentShopId, currentLanguage, accountId } = getState().shop;
        const apolloClient = getApolloClient(getState());
        dispatch({ type: FETCH_CATEGORY_PRODUCTS_REQUEST });
        const GET_CATEGORY_PRODUCTS = gql`
            query categoryProducts($categoryId: ID!, $params: CategoryProductsParamsInput) {
                categoryProducts(categoryId: $categoryId, params: $params) {
                    products {
                        ... ProductWithOptionsFragment
                        averageRating
                        reviewCount
                    }
                    aggregations {
                        id
                        name
                        code
                        type
                        ... on AggregationWithOptions {
                            options {
                                id
                                name
                                swatch
                                resultCount
                            }
                        }
                        ... on AggregationWithRange {
                            minValue
                            maxValue
                        }
                    }
                    total
                    totalPages
                }
            }
            ${ProductWithOptionsFragment}
        `;
        const filtersFormatted = [];
        for (const attrCode in filters) {
            if (Object.hasOwnProperty.call(filters, attrCode)) {
                const optionIds = filters[attrCode];
                filtersFormatted.push({
                    attributeCode: attrCode,
                    optionIds
                });
            }
        }
        const queryParams = {
            filters: filtersFormatted,
            page: parseInt(page),
            pageSize: perPage || 16,
            sort,
            dir
        }
        const { data } = await apolloClient.query({
            query: GET_CATEGORY_PRODUCTS,
            variables: {
                categoryId: categoryId,
                shopId: String(currentShopId),
                accountId,
                params: queryParams
            },
            fetchPolicy: "no-cache"
        });

        const { categoryProducts: result } = data;
        dispatch({
            type: FETCH_CATEGORY_PRODUCTS_RESPONSE,
            payload: {
                categoryId,
                result
            }
        });
    }
}

export const fetchProductChart = (productId) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
    
        const GET_PRODUCT_CHART = gql`
            query productChart($productId: ID!) {
                productChart(productId: $productId) {
                    id
                    name
                    attributes {
                        attribute {
                            id
                            code
                            name
                            type
                            options {
                                id
                                name
                                swatch
                            }
                        }
                        selectedOptions {
                            id
                            name
                            swatch
                        }
                    }
                    data {
                        id
                        attributes {
                            attributeId
                            optionId
                        }
                        value
                    }
                }
            }
        `;
        try {
            const { data } = await apolloClient.query({
                query: GET_PRODUCT_CHART,
                variables: {
                    productId
                },
                fetchPolicy: "no-cache"
            });
            dispatch({
                type: FETCH_PRODUCT_CHART,
                payload: { data: data.productChart }
            });
        } catch (error) {
            dispatch({
                type: FETCH_PRODUCT_CHART,
                payload: { data: {} }
            });
        }
    }
}