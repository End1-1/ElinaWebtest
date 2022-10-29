const initialState = {
    isFetchingSearchResults: false,
    searchResults: []
};

import { 
    FETCH_SEARCH_RESULTS_RESPONSE
} from '../actions/search';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_SEARCH_RESULTS_RESPONSE: 
            return { 
                ...state, 
                searchResults: { 
                    ...state.searchResults, 
                    [action.payload.query]: action.payload.results 
                }, 
                isFetchingSearchResults: false 
            };
        default:
            return state;

    }
    return state;
}