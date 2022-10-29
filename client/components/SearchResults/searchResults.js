import React, { useEffect, useState } from 'react';
import classes from 'Components/SearchResults/searchResults.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductList from 'Components/ProductList';
import Toolbar from 'Components/Toolbar';
import { usePagination } from 'Hooks/usePagination';
import { fetchSearchResults } from 'Store/actions/search';
import { getFiltersFromUrlSearch } from 'Helper/url';
import Filters from 'Components/Filters';
import Head from 'Components/Head';

const PAGE_SIZE = 6;

const SearchResults = (props) => {
    const { results, searchQuery } = props;

    const location = useLocation();
    const dispatch = useDispatch();

    const categoryProducts = {
        products: results.items.products,
        aggregations: results.aggregations
    };

    const { isFetchingCategoryProducts } = useSelector(state => state.product);
    
    const [ isFetchingProducts, setIsFetchingProducts ] = useState();

    // Set up pagination.
    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;
    const { supportedAttributeCodesInUrl } = useSelector(state => state.app);

    // const location = useLocation();
    // We will use this to avoid infinite loop url <=> state
    const [filtersInitializedFromParams, setFiltersInitializedFromParams] = useState(false);
    const [filters, setFilters] = useState({});
    // Take the filters from url params and change the filters state
    useEffect(() => {
        // Hardcoding this for now
        const possibleFilterCodes = ['q', ...supportedAttributeCodesInUrl];
        const initial = getFiltersFromUrlSearch(location.search, possibleFilterCodes);
        setFilters(initial);
        setFiltersInitializedFromParams(true);
    }, [location.search]);
    
    const totalPagesFromData = categoryProducts ? categoryProducts.totalPages : 1;

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages,
        pageSize: PAGE_SIZE
    };

    useEffect(() => {
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [setTotalPages, totalPagesFromData]);

    useEffect(() => {
        if (filtersInitializedFromParams) {
            dispatch(fetchSearchResults(searchQuery, filters, currentPage));
        }
    }, [searchQuery, currentPage, filters, filtersInitializedFromParams]);
    return (
        <div className={classes.root}>
            <Head>
                <title>{'Search Results'}</title>
            </Head>
            <div className={classes.body}>
                <div>
                    <div className={classes.filtersAndList}>
                        {categoryProducts && <Filters aggregations={categoryProducts.aggregations || []}  />}
                        {true ? 
                        <div>
                            <Toolbar pageControl={pageControl} />
                            <ProductList products={categoryProducts.products} isFetchingProducts={isFetchingCategoryProducts} />
                            <Toolbar pageControl={pageControl} />
                        </div> : 
                        <div>Empty</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;