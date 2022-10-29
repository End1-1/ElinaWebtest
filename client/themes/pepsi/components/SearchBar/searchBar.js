import React from 'react';
import classes from './searchBar.module.css';
import Link from 'Components/Link';
import useWindowSize from 'Hooks/useWindowSize';
import Icon from 'Components/Icon';

const Search = (props) => {
    const { loading, results, onSearchChange, seeAllButtonText, seeAllButtonLink, isOpen, setIsOpen } = props;
    const { width } = useWindowSize();
    const getValue = (event) => {
        onSearchChange(event.target.value)
    }
    const handleChangeIsOpen = () => {
        if(width < 768) {
            setIsOpen(!isOpen)
        }
    }

    return (
        <div className={classes.root}>
            <div className={loading ? classes.loading : null}>
                {(width > 768 || isOpen) && <input type="text" onKeyUp={getValue} placeholder={'Search here...'} className={isOpen ? classes.inputMobile : classes.inputField}/>}
                <span className={width > 768 ? classes.searchIcon : isOpen ? classes.searchIconOpen : classes.searchIconMobile} onClick={handleChangeIsOpen}>
                    <Icon name="search"/>
                </span>
                {!!results.length && <div className={classes.result}>
                    {results.map((result, index) =>                         
                        <Link to={result.url} key={index} className={classes.item}>
                            <p>{result.title}</p>                        
                            <img src={result.image} />
                            <strong>{result.price}</strong>
                            <p>{result.description}</p>
                        </Link>
                    )}
                    {seeAllButtonLink && <Link to={seeAllButtonLink} className={classes.seeAll}><span>{seeAllButtonText}</span></Link>}
                </div>}            
            </div>        
        </div>
    )
}

export default Search;