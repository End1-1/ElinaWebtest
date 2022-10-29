import React from "react";
import classes from "./dropdown.module.css";
import TextInput from "Components/TextInput";

const Dropdown = (props) => {
  const { value = [], items, onSelectionChange } = props;

  return (
    <div className={classes.root}>
      <div>
        <p className={classes.title}>Price</p>
        <TextInput
          type="text"
          placeholder="From"
          classes={{ input: classes.input }}
        />
        <TextInput
          type="text"
          placeholder="To"
          classes={{ input: classes.input }}
        />
      </div>

      <div>
        <p className={`${classes.title} ${classes.titleSec}`}>Dish Type</p>
        <div className={classes.swatchContainer}></div>
      </div>
    </div>
  );
};

export default Dropdown;
