import React, { useMemo } from "react";
import { mergeClasses } from "Helper/classify";
import RadioButton from "Components/CheckoutContent/radioButton";
import defaultClasses from "./radioButtonList.module.css";

const RadioButtonList = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const { selectedValue = "", items, onSelectionChange } = props;

  const radioButtons = useMemo(
    () =>
      items.map((item) => {
        const isSelected = item.id === selectedValue;
        return (
          <RadioButton
            key={item.id}
            isSelected={isSelected}
            label={item.label}
            onClick={onSelectionChange}
          />
        );
      }),
    [selectedValue, items, onSelectionChange]
  );

  return <div className={classes.root}>{radioButtons}</div>;
};

export default RadioButtonList;
