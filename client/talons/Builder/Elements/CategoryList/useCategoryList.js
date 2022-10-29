import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from '../../../../talons/App/useTranslations';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';


export const useCategoryList = (props) => {
    const [isFetched, setIsFetched] = useState(false);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState({}); 
    const apolloClient = getApolloClient();
    
    const { __ } = useTranslations();

    const fetchCategories = useCallback(async () => {
        const GET_CATEGORIES = gql`
            query getCategories {
                categories {
                    id
                    name
                    urlKey
                    parent
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_CATEGORIES,
            variables: {},
            fetchPolicy: "no-cache"
        });

        const { categories } = data;
        setCategories(categories);
        setIsFetched(true);
    }, [setCategories]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const categoryDropdownOptions = useMemo(() => {
        return categories.map(category => {
            return {
                key: category.id,
                label: category.name,
                value: category.id
            }
        })
    }, [categories]);

    return {
        categoryDropdownOptions,
        categories,
        isFetched,
        __
    }
}