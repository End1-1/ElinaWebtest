import { FETCH_STORE_LOCATIONS } from "../actions/storeLocations"

const initialState = {
    storeLocations: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_STORE_LOCATIONS:
            return { ...state, storeLocations: action.payload };
        default: return state;
    }
}