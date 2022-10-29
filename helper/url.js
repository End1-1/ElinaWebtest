export const getFiltersFromUrlSearch = (search, possibleFilterCodes) => {
    const filters = {};
    const params = new URLSearchParams(search);
    
    possibleFilterCodes.map(filterCode => {
        const searchParamValue = params.get(filterCode);
        if (searchParamValue) {
            filters[filterCode] = searchParamValue.split(',').map(value => value);
        }
    });
    return filters;
}

export const getParamsFromUrlSearch = (search, possibleParams = []) => {
    const filters = {};
    const params = new URLSearchParams(search);
    
    possibleParams.map(filterCode => {
        const searchParamValue = params.get(filterCode);
        if (searchParamValue) {
            filters[filterCode] = searchParamValue.indexOf(',') > 0 ? searchParamValue.split(',').map(value => value) : searchParamValue;
        }
    });
    return filters;
}

export const getFiltersFromNextRouter = (query, possibleFilterIds) => {
    const filters = {};
    possibleFilterIds.map(filterId => {
        const searchParamValue = query[filterId];
        if (searchParamValue) {
            filters[filterId] = searchParamValue.split(',').map(value => value);
        }
    });
    return filters;
}

export const getFiltersFromExpressRequest = (query, possibleFilterIds) => {
    const filters = {};
    possibleFilterIds.map(filterId => {
        const searchParamValue = query[filterId];
        if (searchParamValue) {
            filters[filterId] = searchParamValue.split(',').map(value => value);
        }
    });
    return filters;
}