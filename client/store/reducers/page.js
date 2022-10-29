const initialState = {
    data: [],
    searchResults: [],
    isSearching: false
};

import { 
    FETCH_PAGE
} from '../actions/page';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_PAGE: 
            const exists = state.data.find(page => page.id == action.payload.id && page.language == action.payload.language);
            if (!exists) {
                return {...state, data: [...state.data, action.payload]};
            }
        default:
            return state;

    }
    return state;
}