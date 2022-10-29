import BrowserPersistence from 'Helper/simplePersistence';
const storage = new BrowserPersistence();

export const ADD_PRODUCT_REQUEST = 'fetch_products_request';

export const ADD_PRODUCT_RESPONSE = 'fetch_products_response';

export const CREATE_CART_RESPONSE = 'create_cart_response';

export const FETCH_CART_REQUEST = 'fetch_cart_request';

export const FETCH_CART_RESPONSE = 'fetch_cart_response';

export const CLEAR_CART = 'clear_cart';

export const FETCH_SHIPPING_METHODS_REQUEST = 'fetch_shipping_methods_request';

export const FETCH_SHIPPING_METHODS_RESPONSE = 'fetch_shipping_methods_response';

export const FETCH_PAYMENT_METHODS_REQUEST = 'fetch_payment_methods_request';

export const FETCH_PAYMENT_METHODS_RESPONSE = 'fetch_payment_methods_response';

export const ADD_GUEST_CITY = 'add_guest_city';

import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { CartFragment } from 'Fragments/cart.gql';


export const getCartDetails = (product) => {
    return async (dispatch, getState) => {
        const { shop } = getState();
        dispatch({ type: FETCH_CART_REQUEST });
        const { currentShopId } = shop;
        const { token } = getState().auth;
        const apolloClient = getApolloClient(getState());
        const cartId = getState().cart.cartId;
        if (token || cartId) {
            const GET_CART = gql`
                query cart($cartId: String) {
                    cart(cartId: $cartId) {
                        ...CartFragment
                    }
                }
                ${CartFragment}
            `;
            const { data } = await apolloClient.query({
                query: GET_CART,
                variables: {
                    cartId
                }
            });

            const { cart } = data;

            dispatch({
                type: FETCH_CART_RESPONSE,
                payload: cart
            });
        } else {
            // dispatch({
            //     type: FETCH_CART_RESPONSE
            // });
        }
        
    }
}

export const createCart = () => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const { currentShopId } = getState().shop;

        const CREATE_CART = gql`
            mutation createCart {
                createCart
            }
        `;
        const { data } = await apolloClient.mutate({
            mutation: CREATE_CART,
            variables: {}
        });

        const { createCart: cartId } = data;

        storage.setItem('cartId', cartId);
        dispatch({
            type: CREATE_CART_RESPONSE,
            payload: cartId
        });
        return cartId;
    }
}

export const cartInit = () => {
    return async (dispatch, getState) => {
        
        const cartId = await storage.getItem('cartId');
        if (cartId) {
            dispatch({
                type: CREATE_CART_RESPONSE,
                payload: cartId
            });
        }
        dispatch(getCartDetails());
    }
}

export const addProductToCart = (product) => {
    return async (dispatch, getState) => {
        console.log('In action', product);
        const apolloClient = getApolloClient(getState());
        const cart = getState().cart;
        let cartId = getState().cart.cartId;
        if (!cartId) {
            console.log('No cart found');
            cartId = await dispatch(createCart());
            console.log('new cartId', cartId);
        }
        
        const ADD_ITEM_TO_CART = gql`
            mutation addItemToCart($cartId: String, $itemData: ConfigurableCartItemInputData) {
                addItemToCart(cartId: $cartId, itemData: $itemData) {
                    ...CartFragment
                }
            }
            ${CartFragment}
        `;
        const { data } = await apolloClient.mutate({
            mutation: ADD_ITEM_TO_CART,
            variables: {
                cartId: cartId,
                itemData: product
            }
        });

        const { addItemToCart: updatedCart } = data;
        dispatch({
            type: FETCH_CART_RESPONSE,
            payload: updatedCart
        });
    }
}

export const updateCartItems = (items) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        let cartId = getState().cart.cartId;
        if (!cartId) {
            console.log('No cart found');
            cartId = await dispatch(createCart());
            console.log('new cartId', cartId);
        }
        
        const UPDATE_CART_ITEMS = gql`
            mutation updateCartItems($cartId: String, $items: [UpdateCartItemInput]) {
                updateCartItems(cartId: $cartId, items: $items) {
                    ...CartFragment
                }
            }
            ${CartFragment}
        `;
        const { data } = await apolloClient.mutate({
            mutation: UPDATE_CART_ITEMS,
            variables: {
                cartId: cartId,
                items: items
            }
        });

        const { updateCartItems: updatedCart } = data;
        dispatch({
            type: FETCH_CART_RESPONSE,
            payload: updatedCart
        });
    }
}

export const removeItemFromCart = (itemId) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const cart = getState().cart;
        if (!cart.cartId) {
            console.log('No cart found');
            const newCart = await dispatch(createCart());
            console.log('newCart', newCart);
        }
        
        const REMOVE_ITEM_FROM_CART = gql`
            mutation removeItemFromCart($cartId: String, $itemId: String) {
                removeItemFromCart(cartId: $cartId, itemId: $itemId) {
                    ...CartFragment
                }
            }
            ${CartFragment}
        `;
        const { data } = await apolloClient.mutate({
            mutation: REMOVE_ITEM_FROM_CART,
            variables: {
                cartId: cart.cartId,
                itemId
            }
        });

        const { removeItemFromCart: updatedCart } = data;

        dispatch({
            type: FETCH_CART_RESPONSE,
            payload: updatedCart
        });
    }
}

export const clearCart = () => {
    return async (dispatch, getState) => {
        const { shop } = getState();
        const { currentShopId } = shop;
        const apolloClient = getApolloClient(getState());
        const cart = getState().cart;

        const CLEAR_CART = gql`
            mutation clearCart($shopId: String!, $cartId: String) {
                clearCart(shopId: $shopId, cartId: $cartId) 
            }
        `;
        const { data } = await apolloClient.mutate({
            mutation: CLEAR_CART,
            variables: {
                shopId: String(currentShopId),
                cartId: cart.cartId
            }
        });

        const { clearCart } = data;

        dispatch(getCartDetails());
    }
}


export const submitShippingAddress = (address) => {
    return async (dispatch, getState) => {
        const { shop } = getState();
        const apolloClient = getApolloClient(getState());
        const cart = getState().cart;
        const SUBMIT_SHIPPING_ADDRESS = gql`
            mutation submitShippingAddress($cartId: String, $address: CartAddressInput) {
                submitShippingAddress(cartId: $cartId, address: $address) {
                    ...CartFragment
                }
            }
            ${CartFragment}
        `;
        const { data } = await apolloClient.mutate({
            mutation: SUBMIT_SHIPPING_ADDRESS,
            variables: {
                cartId: cart.cartId,
                address
            }
        });
        const { submitShippingAddress: updatedCart } = data;
        dispatch({
            type: FETCH_CART_RESPONSE,
            payload: updatedCart
        });
    }
}

export const submitBillingAddress = (address) => {
    return async (dispatch, getState) => {
        const { shop } = getState();
        const apolloClient = getApolloClient(getState());
        const cart = getState().cart;
        const SUBMIT_BILLING_ADDRESS = gql`
            mutation submitBillingAddress($cartId: String, $address: CartAddressInput) {
                submitBillingAddress(cartId: $cartId, address: $address) {
                    ...CartFragment
                }
            }
            ${CartFragment}
        `;
        const { data } = await apolloClient.mutate({
            mutation: SUBMIT_BILLING_ADDRESS,
            variables: {
                cartId: cart.cartId,
                address
            }
        });
        const { submitBillingAddress: updatedCart } = data;
        dispatch({
            type: FETCH_CART_RESPONSE,
            payload: updatedCart
        });
    }
}


export const submitIdentity = (email, phone) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const cart = getState().cart;
        const SUBMIT_IDENTITY = gql`
            mutation submitIdentity($cartId: String, $email: String, $phone: String) {
                submitIdentity(cartId: $cartId, email: $email, phone: $phone) {
                    ...CartFragment
                }
            }
            ${CartFragment}
        `;
        const { data } = await apolloClient.mutate({
            mutation: SUBMIT_IDENTITY,
            variables: {
                cartId: cart.cartId,
                email,
                phone
            }
        });
        const { submitIdentity: updatedCart } = data;
        dispatch({
            type: FETCH_CART_RESPONSE,
            payload: updatedCart
        });
    }
}


export const submitOrder = (address) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const cart = getState().cart;
        const SUBMIT_ORDER = gql`
            mutation submitOrder($cartId: String!) {
                submitOrder(cartId: $cartId)
            }
        `;
        const { data } = await apolloClient.mutate({
            mutation: SUBMIT_ORDER,
            variables: {
                cartId: cart.cartId
            }
        });
        
        const { submitOrder: orderId } = data;
        // Clear cart
        await storage.removeItem('cartId');
        dispatch({
            type: CLEAR_CART
        });
    }
}

export const clearCartData = () => {
    return async (dispatch, getState) => {
        const { shop } = getState();
        const { currentShopId } = shop;
        const apolloClient = getApolloClient(getState());
        const cart = getState().cart;

        const CLEAR_CART_MUTATION = gql`
            mutation clearCart($shopId: String!, $cartId: String) {
                clearCart(shopId: $shopId, cartId: $cartId) 
            }
        `;
        await apolloClient.mutate({
            mutation: CLEAR_CART_MUTATION,
            variables: {
                shopId: String(currentShopId),
                cartId: cart.cartId
            }
        });
        await storage.removeItem('cartId');
        dispatch({
            type: CLEAR_CART
        });
    }
}

export const fetchShippingMethods = (product) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_SHIPPING_METHODS_REQUEST });
        const apolloClient = getApolloClient(getState());
        const cartId = getState().cart.cartId;
        if (cartId) {
            const GET_AVAILABLE_SHIPPING_METHODS = gql`
                query availableShippingMethods($cartId: String!) {
                    availableShippingMethods(cartId: $cartId) {
                        carrierName
                        carrierCode
                        rates {
                            id
                            name
                            description
                            price
                        }
                    } 
                }
            `;
            const { data } = await apolloClient.query({
                query: GET_AVAILABLE_SHIPPING_METHODS,
                variables: {
                    cartId: cartId
                }
            });

            
            const { availableShippingMethods } = data;
            dispatch({
                type: FETCH_SHIPPING_METHODS_RESPONSE,
                payload: availableShippingMethods
            });
        } else {
            dispatch({
                type: FETCH_SHIPPING_METHODS_RESPONSE,
                payload: []
            });
        }
        
    }
}

export const submitShippingMethod = (method) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const cartId = getState().cart.cartId;
        if (cartId) {
            const SUBMIT_SHIPPING_METHOD = gql`
                mutation submitShippingMethod($cartId: String!, $methodData: CartShippingMethodInput) {
                    submitShippingMethod(cartId: $cartId, methodData: $methodData) {
                        ...CartFragment
                    }
                }
                ${CartFragment}
            `;
            const { data } = await apolloClient.mutate({
                mutation: SUBMIT_SHIPPING_METHOD,
                variables: {
                    cartId: cartId,
                    methodData: method
                }
            });
            const { submitShippingMethod: updatedCart } = data;
            dispatch({
                type: FETCH_CART_RESPONSE,
                payload: updatedCart
            });
        } 
    }
}

export const submitCartComment = (comment) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const cartId = getState().cart.cartId;
        if (cartId) {
            const SUBMIT_CART_COMMENT = gql`
                mutation submitCartComment($cartId: String!, $comment: String) {
                    submitCartComment(cartId: $cartId, comment: $comment) {
                        ...CartFragment
                    }
                }
                ${CartFragment}
            `;
            const { data } = await apolloClient.mutate({
                mutation: SUBMIT_CART_COMMENT,
                variables: {
                    cartId: cartId,
                    comment
                }
            });
            const { submitCartComment: updatedCart } = data;
            dispatch({
                type: FETCH_CART_RESPONSE,
                payload: updatedCart
            });
        } 
    }
}

export const fetchPaymentMethods = () => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_PAYMENT_METHODS_REQUEST });
        const apolloClient = getApolloClient(getState());
        const cartId = getState().cart.cartId;
        if (cartId) {
            const GET_AVAILABLE_PAYMENT_METHODS = gql`
                query getPaymentMethods($cartId: String!) {
                    getPaymentMethods(cartId: $cartId) {
                        methodCode
                        methodName
                    } 
                }
            `;
            const { data } = await apolloClient.query({
                query: GET_AVAILABLE_PAYMENT_METHODS,
                variables: {
                    cartId: cartId
                }
            });
            const { getPaymentMethods } = data;
            dispatch({
                type: FETCH_PAYMENT_METHODS_RESPONSE,
                payload: getPaymentMethods
            });
        } else {
            dispatch({
                type: FETCH_PAYMENT_METHODS_RESPONSE,
                payload: []
            });
        }
        
    }
}

export const submitPaymentMethod = (method) => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const cartId = getState().cart.cartId;
        if (cartId) {
            const SUBMIT_PAYMENT_METHOD = gql`
                mutation submitPaymentMethod($cartId: String!, $methodData: CartPaymentMethodInput) {
                    submitPaymentMethod(cartId: $cartId, methodData: $methodData) {
                        ...CartFragment
                    }
                }
                ${CartFragment}
            `;
            const { data } = await apolloClient.mutate({
                mutation: SUBMIT_PAYMENT_METHOD,
                variables: {
                    cartId: cartId,
                    methodData: method
                }
            });
            const { submitPaymentMethod: updatedCart } = data;
            console.log('updatedCart', updatedCart);
            dispatch({
                type: FETCH_CART_RESPONSE,
                payload: updatedCart
            });
        } 
    }
}