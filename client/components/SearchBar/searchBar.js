import React, { useState } from 'react';
import defaultClasses from './searchBar.module.css';
import Link from 'Components/Link';
import Image from 'Components/Image';
import ProductPrice from 'Components/ProductPrice';
import { useSearchBar } from 'Talons/SearchBar/useSearchBar';
import { mergeClasses } from 'Components/classify';

const SearchBar = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes)
    const { getValue, results, loading, isMobile, showSearchBar, followTrigger } = useSearchBar(props);

    if (!showSearchBar && followTrigger) {
        return null;
    }

    return (
        <div className={classes.root}>
            <div className={loading ? classes.loading : null}>
                <input type="text" onKeyUp={getValue} placeholder={'Search here...'} className={classes.searchInput}/>
                {!!results.items.products.length && <div className={classes.result}>
                    {results.items.products.map((result, index) =>                         
                        <Link to={result.urlKey} key={index} className={classes.item}>
                            <p>{result.name}</p>                        
                            <Image src={`${result.images[0].path}`} width={150} />
                            <ProductPrice product={result} />
                            <p>{result.description}</p>
                        </Link>
                    )}
                    {seeAllButtonLink && <Link to={seeAllButtonLink} className={classes.seeAll}><span>{seeAllButtonText}</span></Link>}
                </div>}           
            </div>        
        </div>
    )
}

SearchBar.defaultProps = {
    followTrigger: true
}

export default SearchBar;