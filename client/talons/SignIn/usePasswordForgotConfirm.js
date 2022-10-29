import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslations } from 'Talons/App/useTranslations';
import * as Yup from 'yup';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { useSelector } from 'react-redux';

export const usePasswordForgotConfirm = (props) => {
    const { username, userId, setShowConfirmation, setMessage, afterSuccess } = props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResendingCode, setIsResendingCode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const state = useSelector(state => state);

    const { __ } = useTranslations();

    const PasswordForgotConfirmSchema = useMemo(() => Yup.object().shape({
        confirmationCode: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        password: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    }), []);

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            confirmationCode: '',
            password: ''
        },
        validationSchema: PasswordForgotConfirmSchema,
        onSubmit: async (values) => {
            const { confirmationCode, password } = values;
            try {
                setIsSubmitting(true);
                const apolloClient = getApolloClient(state);
                const PASSWORD_FORGOT__CONFIRM = gql`
                    mutation confirmForgotPassword($username: String!, $confirmationCode: String!, $password: String!) {
                        confirmForgotPassword(username: $username, confirmationCode: $confirmationCode, password: $password)
                    }
                `;
                const { data } = await apolloClient.mutate({
                    mutation: PASSWORD_FORGOT__CONFIRM,
                    variables: {
                        username: username,
                        confirmationCode,
                        password
                    }
                });
                const { confirmForgotPassword } = data;
                setIsSubmitting(false);
                if (confirmForgotPassword) {
                    setMessage({
                        type: 'success',
                        text: __("changing.password.message")
                    });
                    setShowConfirmation(false);
                    if (afterSuccess) {
                        afterSuccess();
                    }
                }
            } catch (error) {
                if (error.message == 'CodeMismatchException') {
                    setMessage({
                        type: 'error',
                        text: 'Confirmation Code is wrong'
                    });
                }
            }
            
        },
    });

    const handleResendCode = async () => {
        setIsResendingCode(true);
        const apolloClient = getApolloClient(state);
        const RESEND_CONFIRMATION_CODE = gql`
            mutation resendConfirmationCode($username: String!) {
                resendConfirmationCode (username: $username)
            }
        `;
        const { data } = await apolloClient.mutate({
            mutation: RESEND_CONFIRMATION_CODE,
            variables: {
                username: username
            }
        });
        setIsResendingCode(false);
    }

    return {
        formik,
        handleResendCode,
        isSubmitting,
        isResendingCode,
        showPassword, 
        setShowPassword,
        __
    }
}