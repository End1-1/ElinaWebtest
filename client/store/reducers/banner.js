const initialState = {
    data: []
};

import { 
    FETCH_BANNER
} from '../actions/banner';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_BANNER: 
            const exists = state.data.find(banner => banner.id == action.payload.id && banner.language == action.payload.language);
            if (!exists) {
                return {...state, data: [...state.data, action.payload]};
            }
        default:
            return state;

    }
    return state;
}