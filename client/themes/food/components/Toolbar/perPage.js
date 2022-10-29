import React from "react";
import { usePerPage } from "Talons/Toolbar/usePerPage";
import Select from "Components/Select";
import defaultClasses from "./perPage.module.css";
import { mergeClasses } from "Helper/classify";

const PerPage = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const { value, isEnabled, dropdownOption, handleChange } = usePerPage(props);

  // if (!isEnabled || !value) {
  //   return null;
  // }

  return (
    <div className={classes.root} style={props.style}>
      {props.label && <p className={classes.label}>{`${props.label}:`}</p>}
      <Select
        // defaultValue={value}
        // options={dropdownOption}
        defaultValue="20"
        options={[
          { value: 10, label: 10 },
          { value: 20, label: 20 },
          { value: 30, label: 30 },
          { value: 40, label: 40 },
        ]}
        onChange={handleChange}
        classes={{ root: classes.perPageSelect, open: classes.open }}
      />
    </div>
  );
};

export default PerPage;
