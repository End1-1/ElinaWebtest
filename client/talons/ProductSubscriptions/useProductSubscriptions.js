import { gql } from "@apollo/client";
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import getApolloClient from "Apollo/apolloClient";
import get from 'lodash/get'
import { ProductWithOptionsFragment } from 'Fragments/productWithOptions.gql';
import { useTranslations } from 'Talons/App/useTranslations';

export const useProductSubscriptions = () => {
    const { token } = useSelector(state => state.auth);
    const state = useSelector(state => state);
    const { currentLanguage } = useSelector(state => state.shop);
    const [items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const { __ } = useTranslations();
    const fetchSubscribtions = useCallback(async() => {
        setIsFetching(true)
        const GET_SUBSCRIBTIONS = gql`
            query ProductSubscribers {
                getProductSubscribers {
                    items {
                        product {
                            ... ProductWithOptionsFragment
                        }
                    }
                }  
            }
           ${ProductWithOptionsFragment}
        `
        const apolloClient = getApolloClient(state);
        const response = await apolloClient.query({
            query: GET_SUBSCRIBTIONS
        });
        const items = get(response, "data.getProductSubscribers.items", []);
        if(items.length) {
            const products = items.map(e => e.product)
            setItems(products);
        }
        setIsFetching(false)
    }, [token, currentLanguage])

    useEffect(() => {
        fetchSubscribtions()
    }, []);

    return {
        items,
        isFetching,
        __
    }

}