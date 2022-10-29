import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from '../../../../talons/App/useTranslations';
import * as Yup from 'yup';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';


export const useSettings = (props) => {
    const { attribute, handleSubmit, item } = props;
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    }, [setCategories]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const SettingsFormSchema = useMemo(() => Yup.object().shape({
        maxDepth: Yup.number()
          .required(__('form.field.required.error.message')),
        rootCategoryId: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    }), []);

    const formik = useFormik({
        initialValues: item ? item : {
            maxDepth: 1,
            rootCategoryId: ''
        },
        validationSchema: SettingsFormSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            handleSubmit(values);
        },
    });

    const categoryDropdownOptions = useMemo(() => {
        return categories.map(category => {
            return {
                key: category.id,
                text: category.name,
                value: category.id
            }
        })
    }, [categories]);

    return {
        formik,
        categoryDropdownOptions,
        isSubmitting,
        message,
        __
    }
}