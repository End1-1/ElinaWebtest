import React, { useState } from "react";
import classes from "./searchBar.module.css";
import Link from "Components/Link";
import Image from "Components/Image";
import ProductPrice from "Components/ProductPrice";
import Icon from "Components/Icon";
import { useSearchBar } from "Talons/SearchBar/useSearchBar";

const SearchBar = (props) => {
  const {
    getValue,
    results,
    loading,
    isMobile,
    showSearchBar,
    followTrigger,
    seeAllButtonLink,
  } = useSearchBar(props);

  if (!showSearchBar && followTrigger) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={loading ? classes.loading : null}>
        <Icon name="search" size="25px" />
        <input
          type="text"
          onKeyUp={getValue}
          placeholder="Search for food, coffee, etc.."
        />
        {/* {!!results.items.products.length && <div className={classes.result}>
                    {results.items.products.map((result, index) =>
                        <Link to={result.urlKey} key={index} className={classes.item}>
                            <p>{result.name}</p>
                            <Image src={`${result.images[0].path}`} width={150} />
                            <ProductPrice product={result} />
                            <p>{result.description}</p>
                        </Link>
                    )}
                    {seeAllButtonLink && <Link to={seeAllButtonLink} className={classes.seeAll}><span>{seeAllButtonText}</span></Link>}
                </div>} */}
      </div>
    </div>
  );
};

SearchBar.defaultProps = {
  followTrigger: true,
};

export default SearchBar;
