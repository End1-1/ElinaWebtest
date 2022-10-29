import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getFiltersFromUrlSearch, getParamsFromUrlSearch } from 'Helper/url';
import isObjectEmpty from 'Helper/isObjectEmpty';
import { useTranslations } from 'Talons/App/useTranslations';

export const useFilters = (props) => {
    const { aggregations } = props;
    const location = useLocation();
    const history = useHistory();
    // We will use this to avoid infinite loop url <=> state
    const [filtersInitializedFromParams, setFiltersInitializedFromParams] = useState(false);
    const possibleFilterCodes = [...aggregations.map(filter => filter.code), 'q'];
    
    const [filters, setFilters] = useState({});

    // Take the filters from url params and change the filters state
    useEffect(() => {
        if (!filtersInitializedFromParams && possibleFilterCodes.length) {
            const initial = getFiltersFromUrlSearch(location.search, possibleFilterCodes);
            setFilters(initial);
            setFiltersInitializedFromParams(true);
        }
    }, [location.search, possibleFilterCodes]);


    const handleFilterChange = useCallback((attrCode, valueId, replace = false) => {
        const updatedFilters = { ...filters };
        if (updatedFilters[attrCode]) {
            // Replace is used for price (range filters for example)
            if (replace) {
                updatedFilters[attrCode] = valueId;
            } else if (updatedFilters[attrCode].includes(valueId)) {
                updatedFilters[attrCode].splice(updatedFilters[attrCode].indexOf(valueId), 1);
                if (updatedFilters[attrCode].length == 0) {
                    delete updatedFilters[attrCode];
                }
            } else {
                updatedFilters[attrCode].push(valueId);
            }
        } else {
            updatedFilters[attrCode] = [valueId];
        }
        setFilters(updatedFilters);
    }, [filters, setFilters]);


    useEffect(() => {
        if (!filtersInitializedFromParams) return;
        const { search } = location;
        // We take all params besides the filters
        const others = getParamsFromUrlSearch(location.search, ['perPage', 'sort', 'dir', 'q']);
        let queryParams = new Map(Object.entries(others));
        if (isObjectEmpty(filters)) {
            const destination = { search: new URLSearchParams(queryParams).toString() };
            history.push(destination);
        } else {
            for (const attrId in filters) {
                if (Object.hasOwnProperty.call(filters, attrId)) {
                    const value = filters[attrId];
                    queryParams.set(attrId, value.join(','));
                }
            }
            const destination = { search: new URLSearchParams(queryParams).toString() };
            history.push(destination);
        }
    }, [filters]);

    const { __ } = useTranslations();

    return {
        aggregations,
        filters,
        handleFilterChange,
        __
    }
}