const PORT = process.env.PORT || 3000;
const express = require('express');
const fs = require('fs');
const compression = require('compression');
const path = require('path');
const proxy = require('express-http-proxy');
const morgan = require('morgan')
const app = express();
const axios = require('axios');
var serveStatic = require('serve-static')
const chokidar = require('chokidar');

// Gzip compression 
app.use(compression());

app.use(morgan('tiny'));

app.use('*', async (req, res, next) => {
    if (req.query.ACCOUNT_ID && req.query.SHOP_ID) {
        next();
        return;
    }
    // When ACCOUNT_ID and SHOP_ID have been provided in env, use them instead of pulling for the domain
    if (process.env.ACCOUNT_ID && process.env.SHOP_ID) {
        req.query.ACCOUNT_ID = process.env.ACCOUNT_ID;
        req.query.SHOP_ID = process.env.SHOP_ID;
        req.query.THEME_ID = process.env.THEME_ID;
        next();
        return;
    }
    // First we will take the host and will find the subdomain inside it
    const host = req.headers.host;

    try {
        const result = await axios({
            url: process.env.BACKEND_URL,
            method: 'post',
            data: {
                query: `
                    query resolveUnknownDomain ($domain: String!) {
                        resolveUnknownDomain(domain: $domain) {
                            accountId
                            shopId
                            themeId
                        }
                    }
                `,
                variables: {
                    domain: host
                }
            }
        });

        const { accountId, shopId, themeId } = result.data.data.resolveUnknownDomain;
        console.log('accountId', accountId, shopId, themeId);
        req.query.ACCOUNT_ID = accountId;
        req.query.SHOP_ID = shopId;
        req.query.THEME_ID = themeId;
    } catch (error) {
        // Could not resolve the domain
        res.send('UnknownShop');
        return;
    }

    next();
})

// Express should accept requests to static files and respond from public folder
// Fallback mechanism. First look for the file in shop public, then common public
// app.use(serveStatic(, { maxAge: '1y', extensions: ['css', 'js', 'map'] }));
app.use([
    '*.css', '*.js', '*.png', '*.jpg', '*.jpeg', '*.gif', '*.ttf', '*.svg', '*.woff', '*.woff2', '*.map'
], async (req, res, next) => {
    // If the static file exists in shop public folder, return from there
    const shopId = req.query.SHOP_ID;
    try {
        // For example for theme thumbnails, we need to look for them in the theme folders, but
        // for that, they need to start with /theme/fashion for example
        if (req.originalUrl.indexOf('/theme') != -1) {
            const urlParts = req.originalUrl.split('/');
            const themeName = urlParts[2];
            const otherPart = urlParts.splice(3);
            if (themeName) {
                const themeFilePath = path.join(__dirname, `../src/client/themes/${themeName}/theme`, otherPart.join('/')); 
                if (fs.existsSync(themeFilePath)) {
                    //file exists
                    res.sendFile(themeFilePath);
                    return;
                } 
            }
            
        }
        // Otherwise go and look for it in the specific shop bundle
        const filePath = path.join(__dirname, `../public/${shopId}`, req.originalUrl);
        if (fs.existsSync(filePath)) {
            //file exists
            res.sendFile(filePath);
            return;
        }
    } catch (err) {
        console.error(err)
    }
    next();
});
app.use(serveStatic(path.join(__dirname, `../public`), { maxAge: '1y', extensions: ['css', 'js', 'map', 'svg'], index: false, fallthrough: true }));
app.use([
    '*.css', '*.js', '*.png', '*.jpg', '*.gif', '*.ttf', '*.svg', '*.woff', '*.woff2', '*.map'
], async (req, res, next) => {
    // If the static file exists in shop public folder, return from there
    res.send('StaticFileNotFound');
    return;
});

// All requests should be passed to renderer, which will render react
app.use('/graphql', proxy(`${process.env.BACKEND_URL.replace('/graphql', '/')}`, {
    proxyReqPathResolver: function (req) {
        return req.originalUrl;
    }
}));

// In order to parse POST params
// Important - Don't put this before proxy, it breaks it
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/ipn/payment', async (req, res) => {
    // Previously account id and shop id were provided in url, but now we find out via url
    if (!req.query.ACCOUNT_ID) {
        res.send('AccountId is not provided');
        return;
    }
    if (!req.query.SHOP_ID) {
        res.send('ShopId is not provided');
        return;
    }
    if (!req.query.method) {
        res.send('Payment Method is not provided');
        return;
    }

    try {
        const result = await axios({
            url: process.env.BACKEND_URL,
            method: 'post',
            headers: {
                'account-id': req.query.ACCOUNT_ID,
                'shop-id': req.query.SHOP_ID
            },
            data: {
                query: `
                    mutation handleIpnRequest ($paymentMethod: String!, $requestMethod: String!, $getParams: String, $postParams: String) {
                        handleIpnRequest(paymentMethod: $paymentMethod, requestMethod: $requestMethod, getParams: $getParams, postParams: $postParams) {
                            action
                            responseRaw
                            redirectPath
                        }
                    }
                `,
                variables: {
                    paymentMethod: req.query.method,
                    requestMethod: req.method,
                    getParams: JSON.stringify(req.query || {}),
                    postParams: JSON.stringify(req.body || {})
                }
            }
        });

        const { action, responseRaw, redirectPath } = result.data.data.handleIpnRequest;
        if (action == 'return') {
            res.setHeader('content-type', 'text/plain');
            res.send(responseRaw);
            return;
        } else if (action == 'redirect') {
            res.redirect(redirectPath)
        }
    } catch (error) {
        res.redirect('/checkout/failure')
    }
    res.send('Wrong request');
});

// Clear the require cache when build bundles change
chokidar.watch(path.resolve(`./build/`)).on('all', (event, path) => {
    delete require.cache[path];
});

// We request and run the shop renderer function, which has been previously bundled for each shop
app.get('*', async (req, res) => {

    try {
        // Deciding client js bundle name (it changes after each build, so we scan the folder to find out the name)
        const clientBundleFiles = fs.readdirSync(path.resolve(`./public/${req.query.SHOP_ID}/`));
        const bundleFileName = clientBundleFiles.find(f => {
            return f.indexOf('app-') !== -1 && path.extname(f) == '.js';
        }) || 'bundle.js';

        const modulePath = path.resolve(`./build/${req.query.SHOP_ID}/server.js`);
        // We know that this will not be old cached one, because we have a watcher in this file as well, which will remove the cache
        const shopRenderer = require(modulePath);
        const content = await shopRenderer(req, res, bundleFileName);
        res.send(content);
    } catch (error) {
        console.log('error', error);
        // If server bundle doesn't exist, that means it has not been deployed yet, 
        // so we should ask them to wait a bit
        res.send('ShopNotReady');
    }
});


app.listen(PORT, () => {
    console.log(`Listing to port ${PORT}`);
});