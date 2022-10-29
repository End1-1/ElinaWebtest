import React from 'react';
import classes from './searchTrigger.module.css';
import { useSearchBar } from 'Talons/SearchBar/useSearchBar';
import Icon from 'Components/Icon';

const SearchTrigger = (props) => {
    const { isMobile, setShowSearchBar } = useSearchBar(props);

    return (
        <div className={classes.root}>
            {isMobile && <Icon name="search" size={'20px'} onClick={() => setShowSearchBar(true)} />}
        </div>
    )
}

export default SearchTrigger;