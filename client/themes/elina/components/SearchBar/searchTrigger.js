import React from 'react';
import classes from './searchTrigger.module.css';
import { useSearchBar } from 'Talons/SearchBar/useSearchBar';
import IconMoon from 'Components/IconMoon';

const SearchTrigger = (props) => {
    const { isMobile, setShowSearchBar } = useSearchBar(props);

    return (
        <div className={classes.root}>
            {isMobile && <IconMoon name="search" size={'20px'} onClick={() => setShowSearchBar(true)} />}
        </div>
    )
}

export default SearchTrigger;