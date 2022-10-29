import getApolloClient from 'Apollo/apolloClient';
import { ProductWithOptionsFragment } from 'Fragments/productWithOptions.gql';
import { gql } from '@apollo/client';
import { convertItemsToTreeWithChildren } from 'Helper/convertItemsToTree';
import trim from 'Helper/trim';

export const FETCH_TRANSLATIONS_RESPONSE = 'fetch_translations_response';

export const FETCH_UNKNOWN_ROUTE_REQUEST = 'fetch_unknown_route_request';

export const FETCH_UNKNOWN_ROUTE_RESPONSE = 'fetch_unknown_route_response';

export const FETCH_COUNTRIES_RESPONSE = 'fetch_countries_response';

export const FETCH_STATES_RESPONSE = 'fetch_states_response';

export const FETCH_DISTCRICTS_RESPONSE = 'fetch_districts_response';

export const FETCH_CITIES_RESPONSE = 'fetch_cities_response';

export const FETCH_MENU_RESPONSE = 'fetch_menu_response';

export const SET_FETCHING_SSR_PROPS = 'fetch_ssr_props';

export const CHANGE_LANGUAGE = 'change_language';

export const TOGGLE_DRAWER = 'toggle_drawer';

export const SET_WINDOW_SIZE = 'set_window_size';

export const SET_SHOW_SEARCH_BAR = 'set_show_search_bar';

export const SET_SUPPORTED_LANG_CODES_IN_URL = 'set_supported_lang_codes_in_url';

export const SET_CONFIGS = 'set_configs';

export const SET_SUPPORTED_ATTRIBUTE_CODES_IN_URL = 'set_supported_attribute_codes_in_url'

export const SET_ENABLED_NATIVE_APPS = 'set_enabled_native_apps';

export const SET_BUILDER_STATUS = 'set_builder_status';

import { FETCH_SCOPE_CONFIG_RESPONSE } from './config';

export const fetchInitialData = (req, res) => {
    return async (dispatch, getState) => {
        try {
            const { path } = req;
            const state = getState();
            const apolloClient = getApolloClient(state);
            const GET_INITIAL_DATA = gql`
                query initialData($path: String!) {
                    initialData(path: $path) {
                        scopeConfig {
                            id
                            value
                            scope
                        }
                        translations {
                            id
                            translation
                        }
                        supportedAttributeCodesInUrl
                        enabledNativeApps
                    }
                }
            `;
            const { data } = await apolloClient.query({
                query: GET_INITIAL_DATA,
                variables: {
                    // We send the path, so that there we find out the language
                    path
                }
            });
            const { initialData } = data;

            // Convert to object format
            const scopeConfigObject = {};
            initialData.scopeConfig.map(config => {
                scopeConfigObject[config.id] = {
                    id: config.id,
                    value: JSON.parse(config.value),
                    scope: config.scope
                };
            })
            
            dispatch({
                type: FETCH_SCOPE_CONFIG_RESPONSE,
                payload: scopeConfigObject
            });
            dispatch({
                type: FETCH_TRANSLATIONS_RESPONSE,
                payload: initialData.translations
            });
            dispatch({
                type: SET_SUPPORTED_ATTRIBUTE_CODES_IN_URL,
                payload: initialData.supportedAttributeCodesInUrl
            });

            dispatch({
                type: SET_ENABLED_NATIVE_APPS,
                payload: initialData.enabledNativeApps
            });

            // Find out what language codes can be in url (this will be used by router on both frontend and backend)
            const languageCodeInUrl = scopeConfigObject.languageCodeInUrl.value;
            let supportedLanguageCodesInUrl = [];
            if (languageCodeInUrl) {
                const availableLanguages = scopeConfigObject.availableLanguages.value ? scopeConfigObject.availableLanguages.value.map(lang => lang.code) : [];
                const languageCodeType = scopeConfigObject.languageCodeType.value;
                supportedLanguageCodesInUrl = languageCodeType == 'short' ? availableLanguages.map(code => code.split('_')[0]) : availableLanguages;
            }
            
            // Settings some of the configs in redux, which will be used in SSR
            dispatch({
                type: SET_CONFIGS,
                payload: {
                    languageCodeInUrl,
                    supportedLangCodesInUrl: supportedLanguageCodesInUrl
                }
            });

            // Maybe this has already been set on server-side level
            let languageIsSet = false;
            if (scopeConfigObject.languageCodeInUrl && scopeConfigObject.languageCodeInUrl.value != 'no') {
                const languageCodeInUrl = scopeConfigObject.languageCodeInUrl.value;
                const { availableLanguages } = scopeConfigObject;
                // We take the language code from params and try to see which language it is
                if (languageCodeInUrl == 'firstParam') {
                    const pathParts = trim(path, '/').split('/');
                    const availableLanguageCodes = availableLanguages.value.map(lang => lang.code);
                    const languageCodeType = scopeConfigObject.languageCodeType.value;
                    // If we show short version, we should decide which one of long versions it matches
                    let languageCodeInUrl = pathParts[0];
                    if (languageCodeType == 'short') {
                        const longVersion = availableLanguageCodes.find(langCode => langCode.indexOf(languageCodeInUrl) === 0);
                        languageCodeInUrl = longVersion;
                    }
                    // Redirect is language code is missing
                    if (!languageCodeInUrl) {
                        const defaultLang = scopeConfigObject.defaultLanguage.value;
                        const defaultLangCode = languageCodeType == 'short' ? defaultLang.split('_')[0] : defaultLang;
                        const redirectPath = `${defaultLangCode}${req.path}`;
                        res.redirect(redirectPath);
                        return;
                    }
                    if (pathParts.length && languageCodeInUrl && availableLanguageCodes.includes(languageCodeInUrl)) {
                        languageIsSet = true;
                        dispatch({
                            type: CHANGE_LANGUAGE,
                            payload: {
                                language: languageCodeInUrl,
                                source: 'url'
                            }
                        });
                    }
                }
            } 
            if (!languageIsSet) {
                // Setting the current language
                if (scopeConfigObject.defaultLanguage) {
                    const defaultLang = scopeConfigObject.defaultLanguage.value;
                    dispatch({
                        type: CHANGE_LANGUAGE,
                        payload: {
                            language: defaultLang,
                            source: 'default'
                        }
                    });
                }
            }
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

export const fetchUnknownRoute = (route, referer = {}) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_UNKNOWN_ROUTE_REQUEST });
        
        const { currentShopId, currentLanguage } = getState().shop;
        const apolloClient = getApolloClient(getState());

        const RESOLVE_UNKNOWN_ROUTE = gql`
            query resolveUnknownRoute($route: String!, $referer: Referer) {
                resolveUnknownRoute(route: $route, referer: $referer) {
                    id
                    type
                    item {
                        id
                        ... on Product {
                            ...ProductWithOptionsFragment  
                            relatedProducts {
                                ...ProductWithOptionsFragment
                            } 
                        }
                        ... on Category {
                            name
                            description
                            urlKey
                            image
                            pageTitle
                            metaDescription
                        }
                        ... on Page {
                            contentType
                            contentHtml
                            content {
                                screenSize
                                content {
                                    id
                                    type
                                    settings
                                    parent
                                    data
                                    children
                                }
                            }
                            pageTitle
                            metaDescription
                        }
                        ... on Post {
                                image
                                title
                                id
                                pageTitle
                                urlKey
                                tags
                                postContent: content
                                author {
                                    email
                                    firstName
                                    lastName
                                }
                        }
                    }
                    breadcrumbs {
                        label
                        link
                    }
                }
            }
            ${ProductWithOptionsFragment}
        `;
        const { data } = await apolloClient.query({
            query: RESOLVE_UNKNOWN_ROUTE,
            variables: {
                route: route,
                referer,
                currentShopId
            },
            fetchPolicy: "no-cache"
        });

        const { resolveUnknownRoute: result } = data;

        if (result.type == 'PAGE') {
            // For now, builder components settings will be jsonDecoded
            result.item.content = result.item.content.map(screenContent => {
                const settingsDecoded = screenContent.content.map(element => {
                    return {
                        ...element,
                        settings: JSON.parse(element.settings),
                        data: JSON.parse(element.data)
                    }
                });
    
                // We convert [] style elements to tree (we already have the logic of rendering such styled page)
                const tree = convertItemsToTreeWithChildren(settingsDecoded);
                return {
                    ...screenContent,
                    content: settingsDecoded,
                    contentTree: settingsDecoded.length && tree.length ? tree[0] : {}
                }
            })
        }

        dispatch({
            type: FETCH_UNKNOWN_ROUTE_RESPONSE,
            payload: {
                route,
                result,
                scope: currentLanguage
            }
        });
        return result;
    }
}





export const fetchTranslations = (locale) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        
        const GET_TRANSLATIONS = gql`
            query getTranslations($locale: String!) {
                getTranslations(locale: $locale) {
                    id
                    translation
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_TRANSLATIONS,
            variables: {
                locale: locale
            }
        });

        const { getTranslations } = data;

        dispatch({
            type: FETCH_TRANSLATIONS_RESPONSE,
            payload: getTranslations
        });
    }
}

export const fetchMenu = (locale) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        
        const GET_MENU = gql`
            query menu {
                menu {
                    content {
                        content {
                            id
                            type
                            settings
                            parent
                            data
                            children
                        }
                        screenSize
                    }
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_MENU,
            variables: {},
            fetchPolicy: "no-cache"
        });

        const { menu } = data;

        dispatch({
            type: FETCH_MENU_RESPONSE,
            payload: {
                ...menu,
                content: menu.content.map(screenContent => {
                    const content = screenContent.content.map(element => {
                        return {
                            ...element,
                            settings: JSON.parse(element.settings),
                            data: JSON.parse(element.data)
                        }
                    });
        
                    // We convert [] style elements to tree (we already have the logic of rendering such styled page)
                    const tree = convertItemsToTreeWithChildren(content);
                    return {
                        ...screenContent,
                        content,
                        contentTree: content.length && tree.length ? tree[0] : {}
                    }
                })
            }
        });
    }
}

export const fetchCountries = () => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        
        const GET_COUNTRIES = gql`
            query getCountries {
                getCountries {
                    id
                    name
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_COUNTRIES,
            variables: {}
        });

        const { getCountries: countries } = data;

        dispatch({
            type: FETCH_COUNTRIES_RESPONSE,
            payload: countries
        });
    }
}

export const fetchStates = (countryId) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        
        const GET_STATES = gql`
            query getStates($countryId: String) {
                getStates(countryId: $countryId) {
                    id
                    name
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_STATES,
            variables: {
                countryId
            }
        });

        const { getStates: states } = data;
        dispatch({
            type: FETCH_STATES_RESPONSE,
            payload: states
        });
    }
}

export const fetchDistricts = (cityId) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        
        const GET_DISTRICTS = gql`
            query getDistricts($cityId: String) {
                getDistricts(cityId: $cityId) {
                    id
                    name
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_DISTRICTS,
            variables: {
                cityId
            }
        });

        const { getDistricts: districts } = data;
        dispatch({
            type: FETCH_DISTCRICTS_RESPONSE,
            payload: districts
        });
    }
}

export const fetchCities = (countryId) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        
        const GET_CITIES = gql`
            query getCities($countryId: String) {
                getCities(countryId: $countryId) {
                    id
                    name
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_CITIES,
            variables: {
                countryId
            }
        });

        const { getCities: cities } = data;
        dispatch({
            type: FETCH_CITIES_RESPONSE,
            payload: cities
        });
    }
}

export const setIsFetchingSSRProps = (value) => {
    return async (dispatch, getState) => {
        dispatch({
            type: SET_FETCHING_SSR_PROPS,
            payload: value
        });
    }
}

const prepareRecursiveResponse = (item) => {
    return {
        ...item,
        children: item.children.map(prepareRecursiveResponse),
        settings: JSON.parse(item.settings),
        data: item.data ? JSON.parse(item.data) : {}
    };
}