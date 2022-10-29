import { useCallback, useEffect } from 'react';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';
import { useSelector } from 'react-redux';
import { useLink } from 'Talons/Link/useLink';
import { useConfig } from 'Talons/App/useConfig';

export const usePlaceOrderAmeria = props => {
    const { handleOriginalPlaceOrder, getAmeriaRedirectUrlQuery, shouldSubmitPayment } = props;
    const state = useSelector(state => state);
    const { token } = useSelector(state => state.auth);
    const { cartId } = useSelector(state => state.cart);
    const { languageCode } = useLink();
    const { getConfigValue } = useConfig();

    const handlePlaceOrder = useCallback(async () => {
        console.log('will placec order ameria');
        try {
            const apolloClient = getApolloClient(state);
            const placeOrderBeforeRedirect = getConfigValue('ameriaBankPlaceOrderBeforeRedirect')

            let ameriaOrderId = null;
            if (placeOrderBeforeRedirect) {
                const { orderId } = await handleOriginalPlaceOrder();
                ameriaOrderId = orderId;
            } else {
                ameriaOrderId = cartId;
            }

            const GET_AMERIA_REDIRECT_URL = gql`
                query ameriaRedirectUrl($orderId: String!, $successPath: String!, $failurePath: String!) {
                    ameriaRedirectUrl(orderId: $orderId, successPath: $successPath, failurePath: $failurePath)
                }
            `;
            const { data } = await apolloClient.query({
                query: GET_AMERIA_REDIRECT_URL,
                variables: {
                    orderId: ameriaOrderId,
                    successPath: `/${languageCode}/checkout/success`,
                    failurePath: `/${languageCode}/checkout/failure`
                },
                fetchPolicy: "no-cache"
            });
            const redirectUrl = data.ameriaRedirectUrl;
            console.log('redirectUrl', redirectUrl);
            window.location.href = redirectUrl;
            return;
        } catch (error) {
            console.log('error', error);
        }

    }, [handleOriginalPlaceOrder, languageCode, cartId, state]);

    useEffect(() => {
        if (shouldSubmitPayment) {
            handlePlaceOrder();
        }
    }, [shouldSubmitPayment]);

    return {
        handlePlaceOrder
    };
};