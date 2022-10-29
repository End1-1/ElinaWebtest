import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslations } from 'Talons/App/useTranslations';
import * as Yup from 'yup';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';


export const useSignUpConfirm = (props) => {
    const { username, userId, setShowConfirmation, setMessage, showSignInSignUp } = props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResendingCode, setIsResendingCode] = useState(false);
    const state = useSelector(state => state);

    const { __ } = useTranslations();

    const ConfirmationSchema = Yup.object().shape({
        confirmationCode: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    });

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            confirmationCode: ''
        },
        validationSchema: ConfirmationSchema,
        onSubmit: async (values) => {
            const { confirmationCode } = values;
            try {
                setIsSubmitting(true);
                const apolloClient = getApolloClient(state);
                const SIGN_UP_CONFIRM = gql`
                    mutation signUpConfirm($username: String!, $confirmationCode: String!, $userId: String!) {
                        signUpConfirm (username: $username, confirmationCode: $confirmationCode, userId: $userId)
                    }
                `;
                const { data } = await apolloClient.mutate({
                    mutation: SIGN_UP_CONFIRM,
                    variables: {
                        username: username,
                        confirmationCode,
                        userId
                    }
                });
                const { signUpConfirm } = data;
                setIsSubmitting(false);
                if (signUpConfirm) {
                    setMessage({
                        type: 'success',
                        text: 'Thanks for signing up, you can login now'
                    });
                    showSignInSignUp("signIn")
                    setShowConfirmation(false);
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
        __
    }
}