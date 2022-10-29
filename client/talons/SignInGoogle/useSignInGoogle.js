import { useCallback } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { signIn } from 'Store/actions/auth';
import { useConfig } from 'Talons/App/useConfig';
import { useSelector } from 'react-redux';

export const useSignInGoogle = (props) => {
    const { __ } = useTranslations();
    const dispatch = useDispatch();
    const { getConfigValue } = useConfig();
    const { scopeConfigFetched } = useSelector(state => state.config);

    const handleSuccess = useCallback(async (response) => {
        console.log('Handle Success', response);
        const apolloClient = getApolloClient();
        const SIGN_IN_GOOGLE = gql`
            mutation signInGoogle($idToken: String!) {
                signInGoogle(idToken: $idToken) {
                    id
                    email
                    phone
                    language
                    firstName
                    lastName
                    accessToken
                }
            }
        `;
        const { data } = await apolloClient.mutate({
            mutation: SIGN_IN_GOOGLE,
            variables: {
                idToken: response.tokenObj.id_token
            }
        });
        const { signInGoogle: customer } = data;
        dispatch(signIn(customer.accessToken));
    }, []);

    const handleFail = useCallback(async (response) => {
        console.log('Handle Fail', response);
    }, []);

    const getIsEnabled = useCallback(() => {
        return scopeConfigFetched ? getConfigValue('facebookSignInEnabled') : false;
    }, []);

    const getClientId = useCallback(() => {
        return scopeConfigFetched ? getConfigValue('facebookAppId') : false;
    }, []);

    return {
        getIsEnabled,
        getClientId,
        handleSuccess,
        handleFail,
        __
    }
}