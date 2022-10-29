import BrowserPersistence from '../../../helper/simplePersistence';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';

export const FETCH_SCOPE_CONFIG_RESPONSE = 'fetch_scope_config_response';

import { CHANGE_LANGUAGE } from './shop';

export const fetchScopeConfig = () => {
    return async (dispatch, getState) => {
        try {
            console.log('fetchScopeConfig');
            const state = getState();
            const apolloClient = getApolloClient(state);
            const GET_ACCOUNT = gql`
                query getScopeConfig {
                    getScopeConfig {
                        id
                        value
                        scope
                    }
                }
            `;
            const { data } = await apolloClient.query({
                query: GET_ACCOUNT,
                variables: {}
            });

            const { getScopeConfig: scopeConfig } = data;

            // Convert to object format
            const scopeConfigObject = {};
            scopeConfig.map(config => {
                scopeConfigObject[config.id] = {
                    id: config.id,
                    value: JSON.parse(config.value),
                    scope: config.scope
                };
            })
            console.log('scopeConfigObject', scopeConfigObject);
            dispatch({
                type: FETCH_SCOPE_CONFIG_RESPONSE,
                payload: scopeConfigObject
            });
            // Setting the current language
            if (scopeConfigObject.defaultLanguage) {
                const defaultLang = scopeConfigObject.defaultLanguage.value;
                dispatch({
                    type: CHANGE_LANGUAGE,
                    payload: defaultLang
                });
            }
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}