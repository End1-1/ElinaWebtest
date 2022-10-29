const initialState = {
    data: [],
    categoryProducts: [],
    isFetchingCategoryProducts: false,
    sliderProducts: [],
    productReviews: [],
    isFetchingProductReviews: false,
    productChart: {}
};

import { 
    FETCH_SLIDER_PRODUCTS, 
    FETCH_CATEGORY_PRODUCTS_REQUEST, 
    FETCH_CATEGORY_PRODUCTS_RESPONSE,
    FETCH_PRODUCT_REVIEWS_REQUEST,
    FETCH_PRODUCT_REVIEWS_RESPONSE,
    FETCH_PRODUCT_CHART
} from '../actions/product';

export default (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_SLIDER_PRODUCTS:
            const sliderProducts = [...state.sliderProducts]; 
            const exists = sliderProducts.find(category => category.id == action.payload.id);
            if (exists) {
                exists.products = action.payload.products;
                return {...state, sliderProducts};
            } else {
                return {...state, sliderProducts: [...state.sliderProducts, action.payload]};
            }
        case FETCH_CATEGORY_PRODUCTS_REQUEST: 
            return { ...state, isFetchingCategoryProducts: true }
        case FETCH_CATEGORY_PRODUCTS_RESPONSE: 
            return { 
                ...state, 
                categoryProducts: { 
                    ...state.categoryProducts, 
                    [action.payload.categoryId]: action.payload.result 
                }, 
                isFetchingCategoryProducts: false 
            };
        case FETCH_PRODUCT_REVIEWS_REQUEST: 
            return { ...state, isFetchingProductReviews: true }
        case FETCH_PRODUCT_REVIEWS_RESPONSE: 
            return { 
                ...state, 
                productReviews: { 
                    ...state.productReviews, 
                    [action.payload.productId]: action.payload.reviews 
                }, 
                isFetchingProductReviews: false 
            };
        case FETCH_PRODUCT_CHART: 
            return { 
                ...state, 
                productChart: action.payload.data
            };
        default:
            return state;

    }
    return state;
}