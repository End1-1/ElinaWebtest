import trim from './trim';

export function prefixPath (path, prefix) {
    return `/${prefix}/${trim(path, '/')}`
}

export function localizeRoutes (routes, supportedLanguageCodesInUrl = []) {
    if (!supportedLanguageCodesInUrl.length) {
        return routes;
    }
    return routes.map(route => {
        // we default to localizing
        if (route.localize !== false)  {
            const paramExpression = supportedLanguageCodesInUrl ? ':locale(' + supportedLanguageCodesInUrl.join('|') + ')' : ':locale';
            return {
               ...route,
               path: prefixPath(route.path, paramExpression)
            }
        }

        return { ...route }
    })
}

