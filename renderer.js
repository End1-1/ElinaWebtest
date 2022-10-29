import "@babel/polyfill";
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
const createStore = require('./createStore').default;
import initialDataLoaders from './client/components/initialDataLoaders';
import { matchRoutes } from 'react-router-config';
import otherDataLoaders from './client/components/dataLoaders';
import asyncForEach from './helper/asyncForEach';
import { setRequestData } from './client/store/actions/shop';
const getRoutes = require('./client/routes').getRoutes;
import App from 'Components/App';

export default async (req, res, bundleFileName) => {
    const store = createStore();
    console.log('req.query', req.query);
    store.dispatch(setRequestData({
        accountId: req.query.ACCOUNT_ID,
        shopId: req.query.SHOP_ID,
        themeId: req.query.THEME_ID
    }));

    // Starting from initial data loaders
    await asyncForEach(initialDataLoaders, async (dataLoader) => {
        await dataLoader(store, req, res);
    });
    const localeSource = store.getState().shop.currentLanguageSource;

    // Checking if store is on maintenance mode
    const { maintenanceModeEnabled, maintenanceModeAllowedIps } = store.getState().config.scopeConfig;
    if (maintenanceModeEnabled && maintenanceModeEnabled.value) {
        const allowedIps = maintenanceModeAllowedIps && maintenanceModeAllowedIps.value ? maintenanceModeAllowedIps.value.split(',') : [];
        // Sometimes we get a string of comma separated values for ip (maybe one is public, one is private, i don't know), so we check all
        const clientIps = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (!allowedIps.find(ip => clientIps.includes(ip))) {
            // @todo. Maybe implement some nice page, or at least auth pass
            res.send('Maintenance Mode');
            return;
        }
    }

    // Router needs this in order to understand if language code is specified
    const { supportedLangCodesInUrl, languageCodeInUrl } = store.getState().app.configs;
    const matchedRoutes = matchRoutes(getRoutes(localeSource != 'default' && languageCodeInUrl != 'no', supportedLangCodesInUrl), req.path);
    const promises = matchedRoutes.map(({ route }) => {
        return route.loadData ? route.loadData(store, req) : null;
    });
    otherDataLoaders.map(loader => promises.push(loader(store, req)));
    return Promise.all(promises).then(() => {
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.path} context={{}}>
                    <App>
                        {renderRoutes(getRoutes(localeSource != 'default' && languageCodeInUrl != 'no', supportedLangCodesInUrl))}
                    </App>
                </StaticRouter>
            </Provider>
        );

        const helmet = Helmet.renderStatic();

        const html = `
            <!doctype html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="stylesheet" href="/css/critical.css" />
                    <link rel="stylesheet" href="/css/nprogress.css" />
                    <link rel="stylesheet" href="/css/react-input-range.css" />
                    <link rel="stylesheet" href="/css/react-carousel.es.css" />
                    ${helmet.link.toString()}
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
                    <script type="text/javascript"> /*this is needed to fb social login*/</script>
                </head>
                <body>
                    <div id="root" style="max-width:1600px; margin:0 auto;">${content}</div>
                    <script>
                        window.INITIAL_STATE=${JSON.stringify(store.getState())}
                    </script>
                    <script src="/${bundleFileName}"></script>
                </body>
            </html>
        `;
        
        return html;
    });
}