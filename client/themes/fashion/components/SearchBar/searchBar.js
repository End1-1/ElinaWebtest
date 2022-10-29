import React, { useState } from 'react';
import classes from './searchBar.module.css';
import Link from 'Components/Link';
import Image from 'Components/Image';
import ProductPrice from 'Components/ProductPrice';
import Icon from 'Components/Icon';

const Search = (props) => {
    const { loading, results, onSearchChange, seeAllButtonText, seeAllButtonLink } = props;

    const getValue = (event) => {
        onSearchChange(event.target.value)
    }

    return (
        <div className={classes.root}>
            <div className={loading ? classes.loading : null}>
                <input type="text" onKeyUp={getValue} placeholder={'Search here...'} />
                <span className={classes.searchIcon}><Icon size={'20px'} name='search' /></span>
                {!!results.items.products.length && <div className={classes.result}>
                    {results.items.products.map((result, index) =>                         
                        <Link to={result.urlKey} key={index} className={classes.item}>
                            <p>{result.name}</p>                        
                            <Image src={`${result.images[0].path}`} width={150} />
                            <ProductPrice product={result} />
                            <p>{result.description}</p>
                        </Link>
                    )}
                    {!!seeAllButtonLink && <Link to={seeAllButtonLink} className={classes.seeAll}><span>{seeAllButtonText}</span></Link>}
                </div>}            
            </div>        
        </div>
    )
}

export default Search;