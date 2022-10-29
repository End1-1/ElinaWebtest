import React, { useState } from "react";
import { useFilters } from "Talons/Filters/useFilters";
import Select from "Components/Select";
import defaultClasses from "./filter.module.css";
import { mergeClasses } from "Helper/classify";
import Dropdown from "Components/Toolbar/dropdown";

const Filter = (props) => {
  const { label, style } = props;
  const classes = mergeClasses(defaultClasses, props.classes);
  const [isOpen, setIsOpen] = useState(false);
  const { aggregations } = useFilters(props);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={classes.root} style={style}>
      <div className={isOpen ? classes.open : null}>
        <div onClick={handleOpen} className={classes.labelContainer}>
          <span className={classes.label}>{label}</span>
        </div>
        <div className={classes.dropdown}>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Filter;
