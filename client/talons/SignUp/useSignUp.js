import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'Talons/App/useTranslations';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { validateEmail } from 'Helper/validateEmail';



export const useSignUp = (props) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [userId, setUserId] = useState();
    const state = useSelector(state => state);

    const { __ } = useTranslations();

    const SignUpSchema = useMemo(() => Yup.object().shape({
        firstName: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        lastName: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        phoneOrEmail: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        password: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        passwordConfirm: Yup.string()
          .required(__('form.field.required.error.message'))
          .oneOf([Yup.ref('password'), null], __('passwords.must.match')),
        privacy: Yup.boolean()
          .oneOf([true], __('field.must.be.checked'))
    }), []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phoneOrEmail: '',
            phoneNumber: '',
            email: '',
            password: '',
            passwordConfirm: '',
            privacy: false
        },
        validationSchema: SignUpSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            setIsSubmitting(true);
            const { firstName, lastName, phoneOrEmail, password, phoneNumber, email } = values;
            try {
                const apolloClient = getApolloClient(state);
                const SIGN_UP = gql`
                    mutation signUp($signUpData: SignUpInput!) {
                        signUp (signUpData: $signUpData) {
                            code
                            userId
                        }
                    }
                `;
                const { data } = await apolloClient.mutate({
                    mutation: SIGN_UP,
                    variables: {
                        signUpData: {
                            firstName,
                            lastName,
                            phone: validateEmail(phoneOrEmail) ? "" : phoneOrEmail,
                            email: validateEmail(phoneOrEmail) ? phoneOrEmail : "",
                            password
                        }
                    }
                });
                const { signUp } = data;
                const { code, userId } = signUp;
                if (code == 'SignUpSuccessConfirmSent') {
                    setUserId(userId);
                    setShowConfirmation(true);
                }
                setIsSubmitting(false);
            } catch (error) {
                if (error.message == 'UsernameExistsException') {
                    setMessage({
                        type: 'error',
                        text: validateEmail(phoneOrEmail) ? __('An account with the given email already exists.') : __('An account with the given phone number already exists.')
                    });
                } else if (error.message == 'UserNotConfirmedException') {
                    try {
                        await Auth.resendSignUp(phoneNumber);
                        setShowConfirmation(true);
                    } catch (error) {
                        if (error.message == 'LimitExceededException') {
                            setMessage({
                                type: 'error',
                                text: __('Attempt limit exceeded, please try after some time.')
                            });
                        }
                    }
                } else {
                    console.log('error', error);
                    setMessage({
                        type: 'error',
                        text: error.message
                    });
                }
                setIsSubmitting(false);
            }
            
        },
    });

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
    
    return {
        formik,
        showConfirmation,
        setShowConfirmation,
        isSubmitting,
        message,
        setMessage,
        userId,
        showPassword, 
        setShowPassword,
        __
    }
}