import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { signIn } from 'Store/actions/auth';
import { useHistory } from 'react-router-dom';
import { useTranslations } from 'Talons/App/useTranslations';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

  export const useSignIn = (props) => {
    const { asPage, closeModal, from } = props;
    const { __ } = useTranslations();
    const history = useHistory();
    const [message, setMessage] = useState(false); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [cognitoUser, setCognitoUser] = useState();
    const { isSignedIn } = useSelector(state => state.auth);
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const SignInSchema = useMemo(() => Yup.object().shape({
        phoneOrEmail: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        password: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    }), []);

    const formik = useFormik({
        initialValues: {
            phoneOrEmail: '',
            password: ''
        },
        validationSchema: SignInSchema,
        onSubmit: async (values) => {
            const { phoneOrEmail, password } = values;
            try {
                setIsSubmitting(true);
                const apolloClient = getApolloClient(state);
                const SIGN_IN = gql`
                    mutation signIn($username: String!, $password: String!) {
                        signIn (username: $username, password: $password) {
                            id
                            email
                            phone
                            language
                            firstName
                            lastName
                            addresses {
                                addressId
                                firstName
                                lastName
                                city
                                address
                                countryCode
                            }
                            accessToken
                        }
                    }
                `;
                const response = await apolloClient.mutate({
                    mutation: SIGN_IN,
                    variables: {
                        username: values.phoneOrEmail,
                        password
                    }
                });
                const { signIn: user } = response.data;
                if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
                    setCognitoUser(user);
                    setShowResetPassword(true);
                } else {
                    await dispatch(signIn(user.accessToken));
                    if(!from) {
                        history.push('/');
                    }
                    closeModal();
                }
                setIsSubmitting(false);
            } catch (error) {
                if (error.message == 'UserNotConfirmedException') {
                    try {
                        const apolloClient = getApolloClient(state);
                        const RESEND_CONFIRMATION_CODE = gql`
                            mutation resendConfirmationCode($username: String!) {
                                resendConfirmationCode (username: $username)
                            }
                        `;
                        const response = await apolloClient.mutate({
                            mutation: RESEND_CONFIRMATION_CODE,
                            variables: {
                                username: phoneNumber
                            }
                        });
                        setIsSubmitting(false);
                        setShowConfirmation(true);
                    } catch (error) {
                        if (error.message == 'LimitExceededException') {
                            setMessage({
                                type: 'error',
                                text: __('Attempt limit exceeded, please try after some time.')
                            });
                            setIsSubmitting(false);
                        }
                    }
                } else if (error.message == 'NotAuthorizedException') {
                    setMessage({
                        type: 'error',
                        text: __('incorrect.sign.in.data')
                    });
                    setIsSubmitting(false);
                } else {
                    setMessage({
                        type: 'error',
                        text: error.message
                    });
                    setIsSubmitting(false);
                }
                
                
            }
        },
    });
    
    useEffect(() => {
        if (isSignedIn && asPage && !from) {
            history.push('/');
        }
    }, [isSignedIn]);

    const handleResetSuccess = useCallback(() => {
        setShowResetPassword(false);
        dispatch(signIn(cognitoUser));
    }, [setShowResetPassword, cognitoUser]);

    const handleResetPasswordSuccess = useCallback(() => {
        setShowForgetPassword(false);
    }, [setShowForgetPassword]);

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
        isSubmitting,
        showConfirmation,
        setShowConfirmation,
        message,
        setMessage,
        showResetPassword,
        cognitoUser,
        handleResetSuccess,
        showForgetPassword,
        setShowForgetPassword,
        handleResetPasswordSuccess,
        showPassword, 
        setShowPassword,
        __
    }
}
