import { useCallback, useEffect, useMemo, useState, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { useTranslations } from 'Talons/App/useTranslations';

const initialState = {
    loading: false,
    results: {
      items: {
        products: [],
        categories: []
      }
    },
    value: '',
  }
  
function exampleReducer(state, action) {
switch (action.type) {
    case 'CLEAN_QUERY':
    return initialState
    case 'START_SEARCH':
    return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
    return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
    return { ...state, value: action.selection }

    default:
    throw new Error()
}
}

export const useSearch = (props) => {
    const [state, dispatch] = useReducer(exampleReducer, initialState);
    const reduxState = useSelector(state => state);
    
    const { __ } = useTranslations();
    let history = useHistory();
    const { currentShopId, currentLanguage } = useSelector(state => state.shop);
    const apolloClient = getApolloClient(reduxState);
    const { loading, results, value } = state;

    const timeoutRef = useRef();

    const handleSearchChange = useCallback(async (value) => {
        clearTimeout(timeoutRef.current);
        dispatch({ type: 'START_SEARCH', query: value });

        timeoutRef.current = setTimeout(async () => {
            const searchTerm = value;
            if (searchTerm.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' });
                return;
            }
            // For now, we support product search only
            const SEARCH = gql`
                query searchSuggestions($query: String!) {
                    searchSuggestions(query: $query) {
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
                            }
                        }
                    }
                }
            `;
            const { data: response } = await apolloClient.query({
                query: SEARCH,
                variables: {
                    query: searchTerm
                },
                fetchPolicy: "no-cache"
            });

            const { searchSuggestions: searchResults } = response;
            
            dispatch({
                type: 'FINISH_SEARCH',
                results: searchResults,
            })
        }, 310)
    }, [currentShopId]);

    useEffect(() => {
        return () => {
        clearTimeout(timeoutRef.current)
        }
    }, []);
    
    return {
        loading,
        history,
        handleSearchChange,
        results,
        value,
        __
    }
}