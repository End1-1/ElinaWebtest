const initialState = {
    data: [],
    searchResults: [],
    isSearching: false
};

import { 
    FETCH_POST, 
    FETCH_POSTS, 
    FETCH_POSTS_BY_SEARCH,
    FETCH_POSTS_BY_SEARCH_REQUEST,
    FETCH_POSTS_BY_SEARCH_RECEIVE
} from '../actions/post';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_POST: 
            const exists = state.data.find(post => post.id == action.payload.id);
            if (!exists) {
                return {...state, data: [...state.data, action.payload]};
            }
        case FETCH_POSTS:
            const notInState = action.payload.filter(({ id }) => 
                !state.data.find(post => post.id == id)
            );
            return {...state, data: [...state.data, ...notInState]};
        case FETCH_POSTS_BY_SEARCH: 
            return {...state, searchResults: action.payload};
        case FETCH_POSTS_BY_SEARCH_REQUEST: 
            return {...state, isSearching: true};
        case FETCH_POSTS_BY_SEARCH_RECEIVE: 
            return {...state, isSearching: false};
        default:
            return state;

    }
    return state;
}