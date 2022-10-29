import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';
import { createUploadLink } from "apollo-upload-client";

const getApolloClient = (state = {}, params = {}) => {
    const token = state && state.auth ? state.auth.token : null;
    const localeCode = state && state.shop ? state.shop.currentLanguage : null;
    const accountId = state && state.shop ? state.shop.accountId : null;
    const currentShopId = state && state.shop ? state.shop.currentShopId : null;
    const { useApiUrl } = params;
    const httpLink = createUploadLink({
        // uri: 'https://mfdvodohb5evrbakah3mmkowpy.appsync-api.eu-central-1.amazonaws.com/graphql',
        // uri: 'https://vmall-api.yereone.com/graphql',
        // uri: BACKEND_URL,
        // For file uploads, we use api url directly until we fix that
        uri: useApiUrl ? BACKEND_URL_REMOTE : BACKEND_URL,
        useGETForQueries: true,
        fetch
    });
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        // const token = localStorage.getItem('token');
        // return the headers to the context so httpLink can read them
        const authHeaders = {}
        const shopHeaders = {
            ['shop-id']: currentShopId, 
            ['account-id']: accountId
        }
        if (token) {
            authHeaders.authorization = token;
        } else {
            authHeaders['x-api-key'] = 'da2-3iprd7aq4jgyhdgwnmgyxzb424';
        }
        if (localeCode) {
            authHeaders['locale'] = localeCode;
        }
        return {
            headers: {
                ...headers,
                ...authHeaders,
                ...shopHeaders
            }
        }
    });
    
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });
    return client;
}


export default getApolloClient;
