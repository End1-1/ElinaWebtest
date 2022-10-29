import React from "react";
import defaultClasses from "./search.module.css";
// import { useSearch } from 'Talons/Search/useSearch';
import SearchBar from "Components/SearchBar";
import { mergeClasses } from "Helper/classify";

const Search = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <div className={classes.root}>
      <SearchBar
        onResultSelect={(e, data) => {}}
        onSearchChange={() => {}}
        followTrigger={props.followTrigger}
      />
    </div>
  );
};

export default Search;
