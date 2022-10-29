const initialState = {
    data: []
};

import { 
    ADD_TOAST
} from '../actions/toast';


export default (state = initialState, action) => {
    switch (action.type) { 
        case ADD_TOAST: 
            return {...state, data: [action.payload, ...state.data]};
        default:
            return state;

    }
    return state;
}