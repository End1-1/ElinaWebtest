import { useState, useMemo, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'Talons/App/useTranslations';
import { submitIdentity } from 'Store/actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from 'Helper/validateEmail';

export const useIdentity = (props) => {
    const { registerCheckoutItem } = props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(false);
    const [userId, setUserId] = useState();
    const { details: cart } = useSelector(state => state.cart);
    const [isReady, setIsReady] = useState(false);

    const { __ } = useTranslations();

    const IdentitySchema = useMemo(() => Yup.object().shape({
        phoneNumber: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .when("phoneOrEmail", {
                is: 'phone',
                then: Yup.string().required(__('form.field.required.error.message')),
            }),
        email: Yup.string()
            .min(2, __('to.short'))
            .max(50, __('to.long'))
            .when("phoneOrEmail", {
                is: 'email',
                then: Yup.string().required(__('form.field.required.error.message')),
            })
    }), []);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            phoneOrEmail: 'email',
            phoneNumber: cart.phone || '',
            email: cart.email || ''
        },
        validationSchema: IdentitySchema,
        onSubmit: async (values) => {
            console.log('values', values);
            if (!validateEmail(values.email)) {
                formik.setFieldError('email', __('invalid.email'));
                return;
            }
            setIsSubmitting(true);
            const { phoneNumber, email } = values;
            try {
                dispatch(submitIdentity(email, phoneNumber));
                setIsSubmitting(false);
                setIsReady(true);
            } catch (error) {
                setIsSubmitting(false);
                setIsReady(true);
            }
            
        },
    });

    const handleCheckoutItemSubmit = useCallback(() => {
        formik.submitForm();
    }, []);

    useEffect(() => {
        registerCheckoutItem({
            id: 'identity',
            step: {
                id: 'shipping',
                title: "shipping"
            },
            submit: handleCheckoutItemSubmit,
            isReady,
            isSubmitting: formik.isValidating || formik.isSubmitting
        });
    }, [isReady, handleCheckoutItemSubmit, formik.isValidating, formik.isSubmitting]);
    
    // Email <=> Phone Automatic Switching
    useEffect(() => {
        if (formik.values.phoneOrEmail == 'email' && formik.values.email) {
            if (formik.values.email[0] == '+') {
                formik.setFieldValue('phoneOrEmail', 'phone', false);
                formik.setFieldValue('phoneNumber', '+', false);
                formik.setFieldValue('email', '', false);
            }
        } else if (formik.values.phoneOrEmail == 'phone' && !formik.values.phoneNumber) {
            formik.setFieldValue('phoneOrEmail', 'email', false);
        }
    }, [formik.values.phoneOrEmail, formik.values.email, formik.values.phoneNumber]);

    useEffect(() => {
        if (cart.email && validateEmail(cart.email)) {
            setIsReady(true);
        }
    },[cart]);

    return {
        formik,
        isSubmitting,
        message,
        setMessage,
        userId,
        __
    }
}