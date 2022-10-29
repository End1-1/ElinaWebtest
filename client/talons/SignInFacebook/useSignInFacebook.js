import { useCallback } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { signIn } from 'Store/actions/auth';
import { useConfig } from 'Talons/App/useConfig';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export const useSignInFacebook = (props) => {
    const { closeModal } = props;
    const { __ } = useTranslations();
    const dispatch = useDispatch();
    const { getConfigValue } = useConfig();
    const state = useSelector(state => state);
    const { scopeConfigFetched } = useSelector(state => state.config);
    const history = useHistory();
    const handleResponse = useCallback(async (response) => {
        console.log('Handle Success', response);
        const apolloClient = getApolloClient(state);
        const SIGN_IN_FACEBOOK = gql`
            mutation signInFacebook($accessToken: String!) {
                signInFacebook(accessToken: $accessToken) {
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
            mutation: SIGN_IN_FACEBOOK,
            variables: {
                accessToken: response.accessToken
            }
        });
        const { signInFacebook: customer } = data;
        dispatch(signIn(customer.accessToken));
        history.push('/account');
        closeModal();
    }, []);

    const getIsEnabled = useCallback(() => {
        return scopeConfigFetched ? getConfigValue('facebookSignInEnabled') : false;
    }, []);

    const getAppId = useCallback(() => {
        return scopeConfigFetched ? getConfigValue('facebookAppId') : false;
    }, []);

    return {
        getIsEnabled,
        getAppId,
        handleResponse,
        __
    }
}