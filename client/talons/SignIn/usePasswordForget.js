import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from 'Talons/App/useTranslations';
import * as Yup from 'yup';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { useSelector } from 'react-redux';

export const usePasswordForget = (props) => {
    const { phoneNumber, afterSuccess } = props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(false); 
    const state = useSelector(state => state)
    const { __ } = useTranslations();

    const PasswordForgetSchema = useMemo(() => Yup.object().shape({
        phoneOrEmail: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__("form.field.required.error.message"))
    }), []);

    const formik = useFormik({
        initialValues: {
            phoneOrEmail: '',
            email: ''
        },
        validationSchema: PasswordForgetSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            const { phoneOrEmail } = values;
            try {
                setIsSubmitting(true);
                // Calling this API causes a message to be sent to the end user with a confirmation code that is required to change the user's password.
                const apolloClient = getApolloClient(state);
                const FORGOT_PASSWORD = gql`
                    mutation forgotPassword($username: String!) {
                        forgotPassword (username: $username)
                    }
                `;
                const { data } = await apolloClient.mutate({
                    mutation: FORGOT_PASSWORD,
                    variables: {
                        username: phoneOrEmail
                    }
                });
                setIsSubmitting(false);
                formik.setFieldValue('username', phoneOrEmail);
                formik.setFieldValue('showPasswordForgetConfirm', true);
                setMessage({
                    type: 'success',
                    text: __('Password reset code has been sent to you')
                });
            } catch (error) {
                if (error.message == "UsernameExistsException") {
                    setMessage({
                        type: 'error',
                        text: __('User does not exists.')
                    });
                    setIsSubmitting(false);
                }   
                console.log('error', error);
            }
            
        },
    });

    return {
        formik,
        isSubmitting,
        message,
        __
    }
}