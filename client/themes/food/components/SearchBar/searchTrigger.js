import React from "react";
import classes from "Components/SearchBar/searchTrigger.module.css";
import { useSearchBar } from "Talons/SearchBar/useSearchBar";
import Icon from "Components/Icon";

const SearchTrigger = (props) => {
  const { setShowSearchBar } = useSearchBar(props);

  return (
    <div className={classes.root}>
      <Icon name="search" size="36px" onClick={() => setShowSearchBar(true)} />
    </div>
  );
};

export default SearchTrigger;
