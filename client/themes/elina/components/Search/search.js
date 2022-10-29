import React from 'react';
import defaultClasses from './search.module.css';
import { useSearch } from 'Talons/Search/useSearch';
import SearchBar from 'Components/SearchBar';
import { mergeClasses } from 'Helper/classify';

const Search  = props => {
    const {
      loading,
      history,
      handleSearchChange,
      results,
      value,
      __
    } = useSearch();
    const classes = mergeClasses(defaultClasses, props.classes);
    const { handleCloseSearchBar } = props;

    return (
        <div className={classes.root}>
            <SearchBar
                classes={classes}
                loading={loading}
                onResultSelect={(e, data) =>
                    history.push(`${data.result.url}`)
                }
                onSearchChange={handleSearchChange}
                results={results}
                value={value}
                seeAllButtonLink={`/search?q=${value}`}
                seeAllButtonText={__("see.all")}
                followTrigger={props.followTrigger}
                handleCloseSearchBar={handleCloseSearchBar}
            />
        </div>
    );
}

export default Search;