import React, { useEffect, useState } from 'react';
import classes from './searchResults.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductList from 'Components/ProductList';
import Toolbar from 'Components/Toolbar';
import { usePagination } from 'Hooks/usePagination';
import { fetchSearchResults } from 'Store/actions/search';
import { getFiltersFromUrlSearch } from 'Helper/url';
import Filters from 'Components/Filters';
import Head from 'Components/Head';
import Banner from 'Components/Banner';
import useWindowSize from "../../../../hooks/useWindowSize";
import IconMoon from "../IconMoon";
import FilterMenu from "../CategoryPage/filterMenu";
import { useTranslations } from 'Talons/App/useTranslations';
import Pagination from 'Components/Toolbar/pagination';

const PAGE_SIZE = 6;

const SearchResults = (props) => {
    const {results, searchQuery} = props;
    const {width} = useWindowSize()
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();
    const dispatch = useDispatch();
    const { __ } = useTranslations();

    const categoryProducts = {
        products: results.items.products,
        aggregations: results.aggregations,
        totalPages: results.totalPages
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
            window.scrollTo(0, 0);
        }
    }, [searchQuery, currentPage, filters, filtersInitializedFromParams]);

    if(categoryProducts && categoryProducts.products && !categoryProducts.products.length && categoryProducts.aggregations && !categoryProducts.aggregations.length) {
        return <h3 className={classes.notFound}>{__("no.products.found")}</h3>
    }

    return (
        <div className={classes.root}>
            <Head>
                <title>{__("search.results")}</title>
            </Head>
            <div className={classes.body}>
                <div>
                    <div className={classes.image}>
                        <Banner id="60880bb07515ab48238068fb" classes={{root:classes.bannerRoot}}/>
                    </div>
                </div>
                <div>
                    <div className={`${classes.filtersAndList} ${!categoryProducts.products.length && classes.noResult}`}>
                        {categoryProducts && width > 768 ?
                        <div className={classes.filter}><Filters aggregations={categoryProducts.aggregations || []}/></div>:
                            <FilterMenu isOpen={isOpen} setIsOpen={setIsOpen}>
                                {categoryProducts  && <Filters aggregations={categoryProducts.aggregations || []}/>}
                            </FilterMenu>
                        }
                        {true ?
                            <div>
                                {width > 768 ? (<h3 className={classes.title}>{categoryProducts && categoryProducts.products && categoryProducts.products.length === 1 ? __("search.result") : __("search.results")}</h3>)
                                    :
                                <div className={classes.filterContainer}>
                                    <h3 className={classes.title}>{categoryProducts && categoryProducts.products && categoryProducts.products.length === 1 ? 'Search result' : 'Search results'}</h3>
                                <button onClick={() => setIsOpen(!isOpen)}
                                         className={`${classes.filterButton}  ${isOpen && classes.filterOpen}`}>{__("filter")} <IconMoon
                                    name='filter' classes={{iconClass: classes.filterIcon}}/>
                                </button>
                                </div>
                                    }
                                <ProductList
                                    products={categoryProducts.products}
                                    isFetchingProducts={isFetchingCategoryProducts}
                                    classes={{
                                        list: classes.list,
                                        itemRoot: classes.itemRoot
                                    }}
                                    largeItems={true}
                                />
                                <Toolbar pageControl={pageControl} />
                                {categoryProducts.products && categoryProducts.products.length ?
                                    <div className={classes.footerTools}>
                                        <Pagination pageControl={pageControl}/>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        :
                            <div>{__("empty")}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;