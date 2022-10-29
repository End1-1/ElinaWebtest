import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from '../../../../talons/App/useTranslations';
import * as Yup from 'yup';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';
import { useSelector } from 'react-redux';


export const useSettings = (props) => {
    const { attribute, handleSubmit, item } = props;
    const [banners, setBanners] = useState([]);
    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const state = useSelector(state => state);
    const apolloClient = getApolloClient(state);
    
    const { __ } = useTranslations();

    const fetchBanners = useCallback(async () => {
        const GET_BANNERS = gql`
            query builderBanners {
                builderBanners {
                    id
                    name
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_BANNERS,
            variables: {},
            fetchPolicy: "no-cache"
        });

        const { builderBanners } = data;
        setBanners(builderBanners);

    }, [setBanners]);

    useEffect(() => {
        fetchBanners();
    }, []);

    const ImageBannerFormSchema = useMemo(() => Yup.object().shape({
        bannerId: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    }), []);

    const formik = useFormik({
        initialValues: item ? item.settings : {
            bannerId: ''
        },
        validationSchema: ImageBannerFormSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            handleSubmit(values);
        },
    });

    const bannerDropdownOptions = useMemo(() => {
        return banners.map(banner => {
            return {
                key: banner.id,
                label: banner.name,
                value: banner.id
            }
        })
    }, [banners]);

    return {
        formik,
        bannerDropdownOptions,
        isSubmitting,
        message,
        __
    }
}