import React from 'react';
import defaultClasses from 'Components/Search/search.module.css';
import { useSearch } from 'Talons/Search/useSearch';
import SearchBar from 'Components/SearchBar';
import { mergeClasses } from '../classify';

const Search  = props => {
    const {
      loading,
      history,
      handleSearchChange,
      results,
      value
    } = useSearch();
    const classes = mergeClasses(defaultClasses, props.classes);

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
                seeAllButtonText={'See All'}
                followTrigger={props.followTrigger}
            />
        </div>
    );
}

export default Search;