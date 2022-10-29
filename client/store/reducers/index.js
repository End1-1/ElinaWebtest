import { combineReducers } from 'redux';
import categoryReducer from './category';
import otherReducer from './other';
import bannerReducer from './banner';
import sliderReducer from './slider';
import appReducer from './app';
import shopReducer from './shop';
import authReducer from './auth';
import productReducer from './product';
import cartReducer from './cart';
import configReducer from './config';
import blockReducer from './block';
import searchReducer from './search';
import postReducer from './post';
import pageReducer from './page';
import storeLocationReducer from './storeLocations';

export default combineReducers({
    shop: shopReducer,
    app: appReducer,
    category: categoryReducer,
    banner: bannerReducer,
    slider: sliderReducer,
    other: otherReducer,
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    config: configReducer,
    block: blockReducer,
    search: searchReducer,
    post: postReducer,
    page: pageReducer,
    storeLocation: storeLocationReducer
});