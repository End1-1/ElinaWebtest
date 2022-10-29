import BrowserPersistence from 'Helper/simplePersistence';
const storage = new BrowserPersistence();
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export const SET_TOKEN = 'set_token';

export const CLEAR_TOKEN = 'clear_token';

export const FETCH_CURRENT_USER = 'fetch_current_user';

export const SET_AUTO_SIGN_IN_TRIED = 'set_auto_sign_in_tried';

import { CustomerFragment } from 'Fragments/customer.gql';
import { CLEAR_CART, getCartDetails, submitShippingAddress } from './cart';

export const autoSignIn = () => {
    return async (dispatch, getState) => {
        try {
            const token = storage.getItem('token');
            if (token) {
                dispatch({
                    type: SET_TOKEN,
                    payload: token
                });
                dispatch(fetchCurrentUserDetails());
            }
            dispatch({
                type: SET_AUTO_SIGN_IN_TRIED
            });
            
        } catch (error) {
            console.log('error authosignin: ', error);
            dispatch({
                type: SET_AUTO_SIGN_IN_TRIED
            });
        }
    }
}

export const signIn = (token) => {
    return async (dispatch, getState) => {
        try {
            storage.setItem('token', token);
            dispatch({
                type: SET_TOKEN,
                payload: token
            });
            await dispatch(fetchCurrentUserDetails());
            await dispatch(getCartDetails());
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

export const deleteAccount = () => {
    return async (dispatch, getState) => {
        try {
            const apolloClient = getApolloClient(getState());
            const DELETE_ACCOUNT = gql`
                mutation deleteAccount {
                    deleteAccount
                }
            `;
            const response = await apolloClient.mutate({
                mutation: DELETE_ACCOUNT
            });
            storage.removeItem('token');
            dispatch({
                type: CLEAR_TOKEN
            });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

export const fetchCurrentUserDetails = (phoneNumber, password) => {
    return async (dispatch, getState) => {
        try {
            const apolloClient = getApolloClient(getState());
            const GET_CURRENT_USER_DETAILS = gql`
                query currentCustomer {
                    currentCustomer {
                        id
                        email
                        phone
                        language
                        firstName
                        lastName
                        isAdmin
                        addresses {
                            addressId
                            firstName
                            lastName
                            city
                            address
                            countryCode
                            stateCode
                            districtCode
                            phone
                            isDefaultBilling
                            isDefaultShipping
                        }
                    }
                }
            `;
            const { data } = await apolloClient.query({
                query: GET_CURRENT_USER_DETAILS,
                fetchPolicy: "no-cache"
            });
            const { currentCustomer: currentUserDetails } = data;
            dispatch({
                type: FETCH_CURRENT_USER,
                payload: currentUserDetails
            });
        } catch (error) {
            console.log('Error while fetching current user details: ', error);
        }
    }
}

export const signOut = () => {
    return async (dispatch, getState) => {
        try {
            const apolloClient = getApolloClient(getState());
            const SIGN_OUT = gql`
                mutation signOut {
                    signOut
                }
            `;
            const response = await apolloClient.mutate({
                mutation: SIGN_OUT
            });
            storage.removeItem('token');
            dispatch({
                type: CLEAR_TOKEN
            });
            storage.removeItem("cartId")
            dispatch({
                type: CLEAR_CART
            });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

export const updateCurrentUserDetails = (data) => {
    return async (dispatch, getState) => {
        try {
            const apolloClient = getApolloClient(getState());
            const UPDATE_CURRENT_USER_DETAILS = gql`
                mutation updateCurrentCustomerDetails ($customerData: CustomerDataInput!) {
                    updateCurrentCustomerDetails (customerData: $customerData) {
                        ...CustomerFragment
                    }
                }
                ${CustomerFragment}
            `;
            const response = await apolloClient.mutate({
                mutation: UPDATE_CURRENT_USER_DETAILS,
                variables: {
                    customerData: data
                }
            });
            const { updateCurrentCustomerDetails: updatedUserData } = response.data;

            dispatch({
                type: FETCH_CURRENT_USER,
                payload: updatedUserData
            });
        } catch (error) {
            console.log('Error when updating current user data: ', error);
            throw new Error(error.message);
        }
    }
}

export const addCustomerAddress = (address) => {
    return async (dispatch, getState) => {
        try {
            const apolloClient = getApolloClient(getState());
            const ADD_CUSTOMER_ADDRESS = gql`
                mutation addCustomerAddress ($addressData: AddressDataInput!) {
                    addCustomerAddress (addressData: $addressData) {
                        ...CustomerFragment
                    }
                }
                ${CustomerFragment}
            `;
            const response = await apolloClient.mutate({
                mutation: ADD_CUSTOMER_ADDRESS,
                variables: {
                    addressData: address
                }
            });
            const { addCustomerAddress: updatedCustomerData } = response.data;
            if (address.isDefaultShipping) {
                dispatch(submitShippingAddress({addressId: updatedCustomerData.lastActionId}))  
            }
            dispatch({
                type: FETCH_CURRENT_USER,
                payload: updatedCustomerData
            });
            return updatedCustomerData;
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

export const editCustomerAddress = (addressId, address) => {
    console.log('addressId', addressId, address);
    return async (dispatch, getState) => {
        try {
            const apolloClient = getApolloClient(getState());
            const EDIT_CUSTOMER_ADDRESS = gql`
                mutation editCustomerAddress ($addressId: String!, $addressData: AddressDataInput!) {
                    editCustomerAddress (addressId: $addressId, addressData: $addressData) {
                        ...CustomerFragment
                    }
                }
                ${CustomerFragment}
            `;
            const response = await apolloClient.mutate({
                mutation: EDIT_CUSTOMER_ADDRESS,
                variables: {
                    addressId,
                    addressData: address
                }
            });
            const { editCustomerAddress: updatedCustomerData } = response.data;

            dispatch({
                type: FETCH_CURRENT_USER,
                payload: updatedCustomerData
            });
            return updatedCustomerData;
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

export const removeCustomerAddress = (addressId) => {
    return async (dispatch, getState) => {
        try {
            const apolloClient = getApolloClient(getState());
            const REMOVE_CUSTOMER_ADDRESS = gql`
                mutation removeCustomerAddress ($addressId: Int!) {
                    removeCustomerAddress (addressId: $addressId) {
                        ...CustomerFragment
                    }
                }
                ${CustomerFragment}
            `;
            const response = await apolloClient.mutate({
                mutation: REMOVE_CUSTOMER_ADDRESS,
                variables: {
                    addressId: parseInt(addressId)
                }
            });
            const { removeCustomerAddress: updatedCustomerData } = response.data;

            dispatch({
                type: FETCH_CURRENT_USER,
                payload: updatedCustomerData
            });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}