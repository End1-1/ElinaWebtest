import React from "react";
import defaultClasses from "./toolbar.module.css";
import { mergeClasses } from "Helper/classify";
import Pagination from "./pagination";
import PerPage from "Components/Toolbar/perPage";
import Sort from "Components/Toolbar/sort";
import Filter from "Components/Toolbar/filter";

const Toolbar = (props) => {
  const { pageControl = {}, filters = [] } = props;

  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <div className={classes.root}>
      <Filter label="Filter" aggregations={filters} />
      <Sort pageControl={pageControl} />
      <PerPage pageControl={pageControl} label="Show" />
    </div>
  );
};

export default Toolbar;
