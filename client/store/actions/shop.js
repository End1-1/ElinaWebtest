import BrowserPersistence from 'Helper/simplePersistence';
const storage = new BrowserPersistence();

export const FETCH_SHOP_REQUEST = 'fetch_shop_request';

export const FETCH_SHOP_RESPONSE = 'fetch_shop_response';

export const CHANGE_LANGUAGE = 'change_language';

export const SET_REQUEST_DATA = 'set_request_data';

import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { fetchTranslations } from './app';

export const changeShop = (shopId) => {
    return async (dispatch, getState) => {
        storage.setItem('currentShopId', shopId);
        dispatch({
            type: CHANGE_SHOP,
            payload: shopId
        });
    }
}

export const setRequestData = (payload) => {
    return async (dispatch, getState) => {
        dispatch({
            type: SET_REQUEST_DATA,
            payload: payload
        });
    }
}

export const changeLanguage = (localeCode) => {
    return async (dispatch, getState) => {
        storage.setItem('currentLocaleCode', localeCode);
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: {
                language: localeCode,
                source: 'change'
            }
        });
        dispatch(fetchTranslations(localeCode));
    }
}

export const languageAutoSelect = () => {
    return async (dispatch, getState) => {
        const localeFromStorage = storage.getItem('currentLocaleCode');
        if (localeFromStorage) {
            dispatch({
                type: CHANGE_LANGUAGE,
                payload: {
                    language: localeFromStorage,
                    source: 'storage'
                }
            });
        } else {
            const defaultLanguage = getState().shop.currentShop.availableLanguages.find(l => l.default == true);
            dispatch({
                type: CHANGE_LANGUAGE,
                payload: {
                    language: defaultLanguage ? defaultLanguage.localeCode : getState().shop.currentShop.availableLanguages[0].localeCode,
                    source: 'default'
                }
            });
        }
    }
}

export const autoSelect = (shopId) => {
    return async (dispatch, getState) => {
        const storeFromStorage = storage.getItem('currentShopId');
        if (storeFromStorage) {
            dispatch({
                type: CHANGE_SHOP,
                payload: storeFromStorage
            });
        } else {
            const firstShop = getState().auth.data[0];
            dispatch({
                type: CHANGE_SHOP,
                payload: firstShop.ShopID
            });
        }
    }
}