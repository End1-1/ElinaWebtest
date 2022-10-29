import { useState, useMemo } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';
import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export const useNewsletterForm = props => {
    const { __ } = useTranslations();

    const [message, setMessage] = useState(); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector(state => state.auth);
    const state = useSelector(state => state);
    
    const NewsletterFormSchema = useMemo(() => Yup.object().shape({
        email: Yup.string().email()
          .required(__('form.field.required.error.message'))
    }), []);
    
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: NewsletterFormSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const SUBSCRIBE_TO_NEWSLETTER = gql`
                    mutation subscribeToNewsletter($email: String!) {
                        subscribeToNewsletter(email: $email)
                    }
                `;

                const apolloClient = getApolloClient(state);
                const { data } = await apolloClient.mutate({
                    mutation: SUBSCRIBE_TO_NEWSLETTER,
                    variables: {
                        email: values.email
                    }
                });

                const { subscribeToNewsletter } = data;
                setMessage({
                    type: 'success',
                    text: 'newsletter.subscribe.success.message'
                });
                formik.resetForm();
                setIsSubmitting(false);
            } catch (error) {
                if (error.message == 'SubscriberAlreadyExists') {
                    setIsSubmitting(false);
                    setMessage({
                        type: 'error',
                        text: 'newsletter.subscriber.exists.error.message'
                    });
                }
            }
            
        },
    });
    return {
        formik,
        message,
        isSubmitting,
        __
    };
};
