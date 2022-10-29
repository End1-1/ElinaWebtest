import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { usePagination } from 'Hooks/usePagination';
import { fetchCategoryProducts } from 'Store/actions/product';
import { getFiltersFromUrlSearch } from 'Helper/url';
import { useConfig } from 'Talons/App/useConfig';
import { useTranslations } from 'Talons/App/useTranslations';

export const useCategoryPage = (props) => {
    const { categoryId, category } = props;
    const { __ } = useTranslations();
    const location = useLocation();
    const dispatch = useDispatch();
    const { getConfigValue } = useConfig();

    const { categoryProducts: allCategoryProducts } = useSelector(state => state.product);
    const categoryProducts = categoryId && allCategoryProducts[categoryId] ? allCategoryProducts[categoryId] : {
        products: [],
        aggregations: []
    };
    const { supportedAttributeCodesInUrl } = useSelector(state => state.app);
    const localeCode = useSelector(state => state.shop.currentLanguage);

    const { isFetchingCategoryProducts } = useSelector(state => state.product);
    
    const [ isFetchingProducts, setIsFetchingProducts ] = useState();

    // Set up pagination.
    const [paginationValues, paginationApi] = usePagination({
        initialPerPage: getConfigValue('catalogProductsPerPage'),
        initialSort: getConfigValue('catalogProductsDefaultSorting')
    });
    const { currentPage, totalPages, currentPerPage, currentSort, currentDir } = paginationValues;
    const { setCurrentPage, setTotalPages, setPerPage, setSort, setDir } = paginationApi;

    // const location = useLocation();
    // We will use this to avoid infinite loop url <=> state
    const [filtersInitializedFromParams, setFiltersInitializedFromParams] = useState(false);
    const [filters, setFilters] = useState({});
    // Take the filters from url params and change the filters state
    useEffect(() => {
        // Hardcoding this for now
        const initial = getFiltersFromUrlSearch(location.search, supportedAttributeCodesInUrl);
        // Reset the page (go to the first page) if filters have been changed
        if (JSON.stringify(filters) != JSON.stringify(initial)) {
            setCurrentPage(1);
        }
        setFilters(initial);
        setFiltersInitializedFromParams(true);
        window.scrollTo(0, 0)
    }, [location.search]);
    
    const totalPagesFromData = categoryProducts ? categoryProducts.totalPages : 1;

    const pageControl = {
        currentPerPage,
        currentPage,
        currentSort,
        currentDir,
        setPage: setCurrentPage,
        setPerPage,
        totalPages,
        setSort,
        setDir,
        pageSize: 6,
        total: categoryProducts.total,
        showingFrom: (currentPage - 1) * currentPerPage + 1,
        showingTo: (currentPage - 1) * currentPerPage + categoryProducts.products.length
    };

    useEffect(() => {
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [setTotalPages, totalPagesFromData]);
    useEffect(() => {
        if (filtersInitializedFromParams) {
            dispatch(fetchCategoryProducts(categoryId, filters, currentPage, {
                perPage: currentPerPage,
                sort: currentSort,
                dir: currentDir
            }));
        }
    }, [
        categoryId, 
        currentPage, 
        currentPerPage, 
        currentSort,
        currentDir,
        JSON.stringify(filters), 
        filtersInitializedFromParams,
        localeCode
    ]);

    return {
        category,
        categoryProducts,
        pageControl,
        isFetchingCategoryProducts,
        __
    }
}