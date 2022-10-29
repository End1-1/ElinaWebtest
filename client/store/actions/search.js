import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export const FETCH_SEARCH_RESULTS_RESPONSE = 'fetch_search_results_response';
import { ProductWithOptionsFragment } from 'Fragments/productWithOptions.gql';

export const fetchSearchResults = (queryString, filters = {}, page = 1, params = {}) => {
    return async (dispatch, getState) => {
        try {
            const { perPage, sort, dir } = params;
            const { currentLanguage } = getState().shop;
            const apolloClient = getApolloClient(getState());
            const SEARCH = gql`
                query search($query: String!, $params: SearchParamsInput) {
                    search(query: $query, params: $params) {
                        items {
                            products {
                                id
                                name
                                sku
                                urlKey
                                images {
                                    path
                                    roles
                                }
                                price
                                shortDescription
                                ... ProductWithOptionsFragment
                            }
                            categories {
                                id
                                name
                                urlKey
                            }
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
                    if (attrCode == 'q') {
                        continue;
                    }
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
            const { data: result } = await apolloClient.query({
                query: SEARCH,
                variables: {
                    query: queryString,
                    params: queryParams
                },
                fetchPolicy: "no-cache"
            });
            dispatch({
                type: FETCH_SEARCH_RESULTS_RESPONSE,
                payload: { query: queryString, results: result.search }
            });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}