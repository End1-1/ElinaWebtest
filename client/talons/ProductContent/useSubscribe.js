import { gql } from "@apollo/client";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import getApolloClient from "Apollo/apolloClient";
import { useConfig } from 'Talons/App/useConfig';
import { useFormik } from "formik";
import { useTranslations } from 'Talons/App/useTranslations';
import * as Yup from 'yup';

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const useSubscribe = (props) => {
    const { productId, variantId } = props;
    const { getConfigValue } = useConfig();
    const whoCanSubscribe = getConfigValue("whoCanSubscribe");
    const letCustomerSubscriptionViaAnotherEmailOrPhone = getConfigValue("letCustomerSubscriptionViaAnotherEmailOrPhone");
    const { isSignedIn,  currentUser } = useSelector(state => state.auth);
    const state = useSelector(state => state);
    const [message, setMessage] = useState("");
    const { __ } = useTranslations();
    const SubscribeFormSchema = useMemo(() => Yup.object().shape({
        // email: Yup.string()
        //   .required(__('This field is required')),
        // phone: Yup.string()
        //   .required(__('This field is required')),
    }), []);

    const formik = useFormik({
        initialValues: {
            guest: "",
            customer: currentUser.phone || currentUser.email,
            phoneOrEmail: "email"
        },
        enableReinitialize: true,
        validationSchema: isSignedIn ? null : SubscribeFormSchema,
        onSubmit: async(values) => {
            console.log(values)
            let productSubscriberData = {};
            if(validateEmail(values.customer)) {
                productSubscriberData.email = values.customer
            } else if (values.customer) {
                productSubscriberData.phone = values.customer
            } else {
                if(validateEmail(values.guest)) {
                    productSubscriberData.email = values.guest
                } else {
                    productSubscriberData.phone = values.guest
                }
            }
            const variables = {
                productId,
                variantId,
                productSubscriberData
            };
            const ADD_PRODUCT_SUBSCRIBER = gql`
                mutation subscribeToOutOfStock($productId: String!, $productSubscriberData: ProductSubscriberInput, $variantId: String) {
                    addProductSubscriber(productId: $productId, variantId: $variantId, productSubscriberData: $productSubscriberData)
                }
            `;
            const apolloClient = getApolloClient(state);
            await apolloClient.mutate({
                mutation: ADD_PRODUCT_SUBSCRIBER,
                variables,
                fetchPolicy: "no-cache"
            })
            setMessage("You have subscribed");
        }
    })
    
    return {
        isSignedIn,
        whoCanSubscribe,
        message,
        setMessage,
        formik,
        letCustomerSubscriptionViaAnotherEmailOrPhone,
        currentUser
    }
}