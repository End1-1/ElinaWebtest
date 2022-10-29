const initialState = {
    data: []
};

import { 
    FETCH_BLOCK
} from '../actions/block';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_BLOCK: 
            const exists = state.data.find(block => block.id == action.payload.id && block.language == action.payload.language);
            if (!exists) {
                return {...state, data: [...state.data, action.payload]};
            }
        default:
            return state;

    }
    return state;
}