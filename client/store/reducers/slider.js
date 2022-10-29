const initialState = {
    data: []
};

import { 
    FETCH_SLIDER
} from '../actions/slider';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_SLIDER: 
            const exists = state.data.find(slider => slider.id == action.payload.id && slider.language == action.payload.language);
            if (!exists) {
                return {...state, data: [...state.data, action.payload]};
            }
        default:
            return state;

    }
    return state;
}