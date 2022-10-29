const initialState = {
    data: [],
    singleCategory: {},
    isFetchingList: false,
    isFetchingSingle: false
};

import { 
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_RESPONSE,
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_RESPONSE
} from '../actions/category';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_CATEGORIES_REQUEST: 
            return {...state, isFetchingList: true};
        case FETCH_CATEGORIES_RESPONSE: 
            return {...state, isFetchingList: false, data: [...action.payload]};
        case FETCH_CATEGORY_REQUEST: 
            return {...state, isFetchingSingle: true};
        case FETCH_CATEGORY_RESPONSE: 
            return {...state, isFetchingSingle: false, singleCategory: action.payload};
        default:
            return state;

    }
    return state;
}