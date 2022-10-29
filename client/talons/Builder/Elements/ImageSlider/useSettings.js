import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from '../../../../talons/App/useTranslations';
import * as Yup from 'yup';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';
import { useSelector } from 'react-redux';


export const useSettings = (props) => {
    const { attribute, handleSubmit, item } = props;
    const [sliders, setSliders] = useState([]);
    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const state = useSelector(state => state);
    const apolloClient = getApolloClient(state);
    
    const { __ } = useTranslations();

    const fetchSliders = useCallback(async () => {
        const GET_SLIDERS = gql`
            query builderSliders {
                builderSliders {
                    id
                    name
                    shopId
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_SLIDERS,
            variables: {},
            fetchPolicy: "no-cache"
        });

        const { builderSliders } = data;
        setSliders(builderSliders);

    }, [setSliders]);

    useEffect(() => {
        fetchSliders();
    }, []);

    const ImageSliderFormSchema = useMemo(() => Yup.object().shape({
        sliderId: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    }), []);

    const formik = useFormik({
        initialValues: item ? item : {
            sliderId: ''
        },
        validationSchema: ImageSliderFormSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            handleSubmit(values);
        },
    });

    const sliderDropdownOptions = useMemo(() => {
        return sliders.map(slider => {
            return {
                key: slider.id,
                label: slider.name,
                value: slider.id
            }
        })
    }, [sliders]);

    return {
        formik,
        sliderDropdownOptions,
        isSubmitting,
        message,
        __
    }
}