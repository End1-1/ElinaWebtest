import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'Talons/App/useTranslations';
import { CartFragment } from 'Fragments/cart.gql';
import * as Yup from 'yup';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { FETCH_CART_RESPONSE } from 'Store/actions/cart';
import { useFormik } from 'formik';


export const useCouponCodeForm = (props) => {
    const { __ } = useTranslations();
    const dispatch = useDispatch();

    const [message, setMessage] = useState(); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector(state => state.auth);
    const state = useSelector(state => state);
    const { cartId, details: cart } = useSelector(state => state.cart);
    
    const CouponCodeFormSchema = useMemo(() => Yup.object().shape({
        code: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    }), []);
    

    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: CouponCodeFormSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const APPLY_COUPON_CODE_TO_CART = gql`
                    mutation applyCouponCodeToCart($cartId: String, $code: String!) {
                        applyCouponCodeToCart(cartId: $cartId, code: $code) {
                            ...CartFragment
                        }
                    }
                    ${CartFragment}
                `;

                const apolloClient = getApolloClient(state);
                const { data } = await apolloClient.mutate({
                    mutation: APPLY_COUPON_CODE_TO_CART,
                    variables: {
                        cartId: cartId,
                        code: values.code
                    }
                });

                const { applyCouponCodeToCart: updatedCart } = data;
                dispatch({
                    type: FETCH_CART_RESPONSE,
                    payload: updatedCart
                });

                setIsSubmitting(false);
                // console.log('res', response);
            } catch (error) {
                setIsSubmitting(false);
                setMessage({
                    type: 'error',
                    text: error.message
                });
            }
            
        },
    });

    const handleRemoveCouponCode = useCallback(async () => {
        try {
            setIsSubmitting(true);
            const REMOVE_COUPON_CODE_FROM_CART = gql`
                mutation removeCouponCodeFromCart($cartId: String) {
                    removeCouponCodeFromCart(cartId: $cartId) {
                        ...CartFragment
                    }
                }
                ${CartFragment}
            `;

            const apolloClient = getApolloClient(state);
            const { data } = await apolloClient.mutate({
                mutation: REMOVE_COUPON_CODE_FROM_CART,
                variables: {
                    cartId: cartId
                }
            });

            const { removeCouponCodeFromCart: updatedCart } = data;
            dispatch({
                type: FETCH_CART_RESPONSE,
                payload: updatedCart
            });

            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
            setMessage({
                type: 'error',
                text: error.message
            });
        }
    }, [token]);
    
    return {
        cart,
        handleRemoveCouponCode,
        message,
        isSubmitting,
        formik,
        __
    }
}