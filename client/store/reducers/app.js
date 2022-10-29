const initialState = {
    translations: [],
    countries: [],
    states: [],
    districts: [],
    cities: [],
    currentLocale: 'hy_AM',
    routeDetails: {},
    isFetchingSSRProps: false,
    isFetchingUnknownRoute: false,
    menu: {
        items: []
    },
    configs: {},
    editorEnabled: true,
    drawer: false,
    windowSize: {},
    showSearchBar: true,
    supportedLangCodesInUrl: [],
    supportedAttributeCodesInUrl: [],
    isBuilderEnabled: false
};

import { 
    FETCH_TRANSLATIONS_RESPONSE,
    FETCH_UNKNOWN_ROUTE_REQUEST,
    FETCH_UNKNOWN_ROUTE_RESPONSE,
    FETCH_COUNTRIES_RESPONSE,
    SET_FETCHING_SSR_PROPS,
    FETCH_MENU_RESPONSE,
    TOGGLE_DRAWER,
    SET_WINDOW_SIZE,
    SET_SHOW_SEARCH_BAR,
    SET_CONFIGS,
    SET_SUPPORTED_ATTRIBUTE_CODES_IN_URL,
    SET_ENABLED_NATIVE_APPS,
    FETCH_STATES_RESPONSE,
    FETCH_DISTCRICTS_RESPONSE,
    FETCH_CITIES_RESPONSE,
    SET_BUILDER_STATUS
} from '../actions/app';


export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_TRANSLATIONS_RESPONSE: 
            return { ...state, translations: action.payload };
        case FETCH_COUNTRIES_RESPONSE: 
            return { ...state, countries: action.payload };
        case FETCH_STATES_RESPONSE: 
            return { ...state, states: action.payload };
        case FETCH_DISTCRICTS_RESPONSE: 
            return { ...state, districts: action.payload };
        case FETCH_CITIES_RESPONSE: 
            return { ...state, cities: action.payload };
        case FETCH_UNKNOWN_ROUTE_REQUEST: 
            return { ...state, isFetchingUnknownRoute: true };
        case FETCH_UNKNOWN_ROUTE_RESPONSE: 
            return { 
                ...state, 
                routeDetails: { 
                    ...state.routeDetails, 
                    [`${action.payload.route}-${action.payload.scope}`]: action.payload.result
                }, 
                isFetchingUnknownRoute: false 
            };
        case SET_FETCHING_SSR_PROPS: 
            return { ...state, isFetchingSSRProps: action.payload };
        case FETCH_MENU_RESPONSE: 
            return { ...state, menu: action.payload };
        case TOGGLE_DRAWER:
            return { ...state, drawer: state.drawer == action.payload ? '' : action.payload }
        case SET_WINDOW_SIZE:
            return { ...state, windowSize: action.payload }
        case SET_SHOW_SEARCH_BAR:
            return { ...state, showSearchBar: action.payload }
        case SET_CONFIGS:
            return { ...state, configs: action.payload }
        case SET_SUPPORTED_ATTRIBUTE_CODES_IN_URL:
            return { ...state, supportedAttributeCodesInUrl: action.payload }
        case SET_ENABLED_NATIVE_APPS:
            return { ...state, enabledNativeApps: action.payload }
        case SET_BUILDER_STATUS:
            return { ...state, isBuilderEnabled: action.payload }
        default:
            return state;

    }
    return state;
}
