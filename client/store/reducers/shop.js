const initialState = {
    data: [],
    isFetching: false,
    currentShopId: SHOP_ID,
    currentShop: {},
    accountId: '',
    currentLanguage: null,
    currentLanguageSource: null,
    themeId: null
};

import { 
    FETCH_SHOP_REQUEST,
    FETCH_SHOP_RESPONSE,
    CHANGE_LANGUAGE,
    SET_REQUEST_DATA
} from '../actions/shop';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_SHOP_RESPONSE: 
        return {...state, currentShop: action.payload, isFetching: false};
        case FETCH_SHOP_REQUEST: 
            return {...state, isFetching: true};
        case CHANGE_LANGUAGE:
            return {
                ...state, 
                currentLanguage: action.payload.language, 
                currentLanguageSource: action.payload.source
            };
        case SET_REQUEST_DATA:
            return {
                ...state, 
                accountId: action.payload.accountId, 
                currentShopId: action.payload.shopId,
                themeId: action.payload.themeId
            };
        default:
            return state;

    }
    return state;
}