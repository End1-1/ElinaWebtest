import React from "react";
import { useSort } from "Talons/Toolbar/useSort";
import Select from "Components/Select";
import defaultClasses from "./sort.module.css";
import { mergeClasses } from "Helper/classify";

const Sort = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const {
    value,
    dir,
    isEnabled,
    dropdownOption,
    handleChange,
    handleDirSwitch,
  } = useSort(props);

  if (!isEnabled || !value) {
    return null;
  }

  return (
    <div className={classes.root} style={props.style}>
      <Select
        placeholder="Sort by"
        options={dropdownOption}
        onChange={handleChange}
        classes={{ root: classes.sortSelect, open: classes.open }}
      />
    </div>
  );
};

export default Sort;
