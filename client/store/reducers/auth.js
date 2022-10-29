const initialState = {
    token: null,
    isSignedIn: false,
    currentUser: {},
    autoSignInTried: false
};

import { 
    SET_TOKEN,
    CLEAR_TOKEN,
    FETCH_CURRENT_USER,
    SET_AUTO_SIGN_IN_TRIED
} from '../actions/auth';


export default (state = initialState, action) => {
    switch (action.type) { 
        case SET_TOKEN: 
            return { ...state, token: action.payload, isSignedIn: true };
        case CLEAR_TOKEN: 
            return { ...state, token: null, isSignedIn: false, currentUser: {} };
        case SET_AUTO_SIGN_IN_TRIED: 
            return { ...state, autoSignInTried: true };
        case FETCH_CURRENT_USER: 
            return { ...state, currentUser: { ...state.currentUser, ...action.payload } };
        default:
            return state;

    }
    return state;
}