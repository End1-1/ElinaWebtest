const initialState = {
    scopeConfig: false,
    scopeConfigFetched: false
};

import { 
    FETCH_SCOPE_CONFIG_RESPONSE
} from '../actions/config';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_SCOPE_CONFIG_RESPONSE: 
            return { ...state, scopeConfig: action.payload, scopeConfigFetched: true };
        default:
            return state;

    }
    return state;
}