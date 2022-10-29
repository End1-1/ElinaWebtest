import React, { useEffect, useMemo } from 'react';
import classes from './page.module.css';
import { fetchSearchResults } from 'Store/actions/search';
import { useSelector, useDispatch } from "react-redux";
import Head from 'Components/Head';
import { useTranslations } from 'Talons/App/useTranslations';
import { useLocation } from 'react-router-dom';
import SearchResults from 'Components/SearchResults';

const Search = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { __ } = useTranslations();
    const { currentLanguage } = useSelector(state => state.shop);

    const searchQuery = useMemo(() => {
        const query = new URLSearchParams(location.search);
        return query.get('q');
    }, [location.search]);

    const { searchResults: allSearchResults } = useSelector(state => state.search);
    const searchResults = allSearchResults[searchQuery];

    useEffect(() => {
        if (searchQuery) {
            dispatch(fetchSearchResults(searchQuery));
        }
    }, [searchQuery, currentLanguage]);

    return (
        <div style={{minHeight: '400px'}}>
            <Head>
                <title>{__('search')}</title>
            </Head>
            <div className={classes.body}>
                {searchResults && <SearchResults results={searchResults} searchQuery={searchQuery} />}
            </div>
        </div>
    );
}

export default Search;