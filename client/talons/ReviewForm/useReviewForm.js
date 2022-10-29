import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from 'Talons/App/useTranslations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { fetchProductReviews } from 'Store/actions/product';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import { useConfig } from 'Talons/App/useConfig';



export const useReviewForm = (props) => {
    const { product } = props;
    const { __ } = useTranslations();
    const dispatch = useDispatch();
    const [message, setMessage] = useState(); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleToggleDrawer } = useDrawer();
    const { token, isSignedIn } = useSelector(state => state.auth);
    const state = useSelector(state => state);
    const { getConfigValue } = useConfig();

    const isAllowedToLeaveReview = useMemo(() => {
        const whoCanLeaveReview = getConfigValue('whoCanLeaveReview');
        if (whoCanLeaveReview == 'loggedInCustomers' && !isSignedIn) {
            return false;
        }
        return true;
    }, [isSignedIn]);

    const ReviewFormSchema = useMemo(() => Yup.object().shape({
        review: Yup.string()
          .min(2, __('to.short'))
          .max(250, __('to.long'))
          .required(__('form.field.required.error.message')),
        rating: Yup.number().required(__('form.field.required.error.message')),
        email: isSignedIn ? null : Yup.string()
            .min(2, __('to.short'))
            .max(250, __('to.long'))
            .required(__('form.field.required.error.message')),
        name: isSignedIn ? null : Yup.string()
            .min(2, __('to.short'))
            .max(250, __('to.long'))
            .required(__('form.field.required.error.message')),
    }), []);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: "",
            summary: '',
            review: '',
            rating: 0
        },
        validationSchema: ReviewFormSchema,
        onSubmit: async (values) => {
            console.log('values review', values);
            try {
                setIsSubmitting(true);
                const ADD_PRODUCT_REVIEW = gql`
                    mutation addProductReview($reviewData: ReviewDataInput!) {
                        addProductReview(reviewData: $reviewData)
                    }
                `;

                const apolloClient = getApolloClient(state);
                const { data } = await apolloClient.mutate({
                    mutation: ADD_PRODUCT_REVIEW,
                    variables: {
                        reviewData: {
                            productId: product.id,
                            ...values
                        }
                    }
                });

                setIsSubmitting(false);
                setMessage({
                    type: 'success',
                    text: 'Thanks for your review!'
                });
                handleToggleDrawer("")
                formik.resetForm();
                dispatch(fetchProductReviews(product.id));
            } catch (error) {
                setIsSubmitting(false);
                setMessage({
                    type: 'error',
                    text: error.message
                });
            }
            
        },
    });

    return {
        isAllowedToLeaveReview,
        formik,
        isSubmitting,
        message,
        isSignedIn,
        __
    }
}
