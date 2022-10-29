import React from 'react';
import defaultClasses from './search.module.css';
import { useSearch } from 'Talons/Search/useSearch';
import SearchBar from 'Components/SearchBar';
import { mergeClasses } from 'Components/classify';

const Search  = props => {
    const { isOpen, setIsOpen } = props;
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
                loading={loading}
                onResultSelect={(e, data) =>
                    history.push(`${data.result.url}`)
                }
                onSearchChange={handleSearchChange}
                results={results}
                value={value}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                seeAllButtonLink={`/search?q=${value}`}
                seeAllButtonText={'See All'}
            />
        </div>
    );
}

export default Search;