const initialState = {
    cartId: null,
    details: {},
    isFetchingCart: false,
    shippingMethods: [],
    isFetchingShippingMethods: false,
    paymentMethods: [],
    isFetchingPaymentMethods: false,
    guestShippingCity: ""
};

import { 
    FETCH_CART_REQUEST,
    FETCH_CART_RESPONSE,
    CREATE_CART_RESPONSE,
    CLEAR_CART,
    FETCH_SHIPPING_METHODS_REQUEST,
    FETCH_SHIPPING_METHODS_RESPONSE,
    FETCH_PAYMENT_METHODS_REQUEST,
    FETCH_PAYMENT_METHODS_RESPONSE,
    ADD_GUEST_CITY
} from '../actions/cart';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_CART_REQUEST: 
            return {...state, isFetchingCart: true};
        case FETCH_CART_RESPONSE: 
            return {...state, isFetchingCart: false, cartId: action.payload ? action.payload.id : null, details: {...action.payload}};
        case FETCH_SHIPPING_METHODS_REQUEST: 
            return {...state, isFetchingShippingMethods: true};
        case FETCH_SHIPPING_METHODS_RESPONSE: 
            return {...state, isFetchingShippingMethods: false, shippingMethods: action.payload};
        case FETCH_PAYMENT_METHODS_REQUEST: 
            return {...state, isFetchingPaymentMethods: true};
        case FETCH_PAYMENT_METHODS_RESPONSE: 
            return {...state, isFetchingPaymentMethods: false, paymentMethods: action.payload};
        case CREATE_CART_RESPONSE:
            return {...state, cartId: action.payload }
        case CLEAR_CART:
            return initialState
        case ADD_GUEST_CITY:
            return {...state, guestShippingCity: action.payload }
        default:
            return state;

    }
    return state;
}