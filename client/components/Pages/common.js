import React, { useEffect, useState, useCallback, useMemo } from 'react';
import classes from './common.module.css';
import { useSelector, useDispatch } from 'react-redux';
import CategoryPage from 'Components/CategoryPage';
import ProductPage from 'Components/ProductPage';
import NotFoundPage from 'Components/Pages/notFoundPage';
import Page from 'Components/Page';
import { fetchUnknownRoute } from 'Store/actions/app';
import { fetchCategoryProducts } from 'Store/actions/product';
import { withRouter } from 'react-router-dom';
import trim from 'Helper/trim';
import { getFiltersFromExpressRequest } from 'Helper/url';
import PostPage from './postPage';
import get from 'lodash/get';
import Loading from 'Components/Loading';

const Common = (props) => {
    const pathname = useMemo(() => {
        const fullPathname = props.location.pathname;
        // Remove the language code if exists in url
        if (props.match.params.locale) {
            const pathNameSplited = trim(fullPathname, '/').split('/');
            pathNameSplited.shift();
            const pathNameWithoutLanguage = pathNameSplited.join('/');
            return trim(pathNameWithoutLanguage, '/');
        } else {
            return trim(fullPathname, '/');;
        }
    }, [props]);

    const referer = props.location.state ? props.location.state.referer : {};

    const dispatch = useDispatch();
    const { routeDetails: allRouteDetails } = useSelector(state => state.app);
    const { categoryProducts: allCategoryProducts } = useSelector(state => state.product);
    const { currentLanguage } = useSelector(state => state.shop);
    const routeDetails = allRouteDetails[`${pathname}-${currentLanguage}`];
    const categoryProducts = routeDetails ? allCategoryProducts[routeDetails.id] : null;
    useEffect(() => {
        if (!routeDetails) {
            dispatch(fetchUnknownRoute(pathname, referer));
        }
    }, [`${pathname}`, routeDetails, currentLanguage]);
    if (routeDetails && routeDetails.type == 'CATEGORY') {
        return <CategoryPage categoryId={routeDetails.id} category={routeDetails.item} categoryProducts={categoryProducts} breadcrumbs={routeDetails.breadcrumbs} />
    } else if (routeDetails && routeDetails.type == 'PRODUCT') {
        return <ProductPage productId={routeDetails.id} product={routeDetails.item} breadcrumbs={routeDetails.breadcrumbs} />
    } else if (routeDetails && routeDetails.type == 'PAGE') {
        return <Page pageId={routeDetails.id} page={routeDetails.item} />
    } else if(routeDetails && routeDetails.type == "POST") {
        return <PostPage post={routeDetails.item}/>
    } else if(routeDetails && routeDetails.type == "NOTFOUND") {
        return <NotFoundPage />
    }

    return <Loading/>;
}

export const loadData = async (store, req) => {
    // Remove the language code if exists in url
    let pathname = decodeURIComponent(trim(req.path, '/'));
    const pathNameSplited = trim(req.path, '/').split('/');
    let languageCodeInUrl = pathNameSplited[0];
    const languageCodeType = get(store.getState(), "config.scopeConfig.languageCodeType.value", "");
    const availableLanguageCodes = store.getState().config.scopeConfig.availableLanguages.value.map(({ code }) => code);
    if (languageCodeType == 'short') {
        const longVersion = availableLanguageCodes.find(langCode => langCode.indexOf(languageCodeInUrl) === 0);
        languageCodeInUrl = longVersion;
    }
    if (languageCodeInUrl && languageCodeInUrl == store.getState().shop.currentLanguage) {
        pathNameSplited.shift();
        const pathNameWithoutLanguage = pathNameSplited.join('/');
        pathname = decodeURIComponent(pathNameWithoutLanguage);
    }

    if (pathname) {
        const routeDetails = await store.dispatch(fetchUnknownRoute(pathname));
        if (routeDetails.type == 'CATEGORY') {
            const filters = getFiltersFromExpressRequest(req.query, ["6003e2c59a7f3d06f429ccf7", 'category', 6797]);
            const page = req.query.page || 1;
            return store.dispatch(fetchCategoryProducts(routeDetails.id, filters, page));
        }
    }
}

export default {
    component: withRouter(Common),
    loadData
};