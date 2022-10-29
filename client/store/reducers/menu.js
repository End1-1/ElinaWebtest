const initialState = {
    data: []
};

import { FETCH_MENU, FETCH_MENUS_WITH_ITEMS } from '../actions/menu';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_MENU: 
            const exists = state.data.find(menu => menu.slug == action.payload.slug);
            if (!exists) {
                return {...state, data: [...state.data, action.payload]};
            }
        case FETCH_MENUS_WITH_ITEMS: 
            const notInState = action.payload.filter(({ slug }) => 
                !state.data.find(menu => menu.slug == slug)
            );
            return {...state, data: [...state.data, ...notInState]};
        default:
            return state;

    }
    return state;
}