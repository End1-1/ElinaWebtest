import React from "react";
import { mergeClasses } from "Helper/classify";
import defaultClasses from "./radioButton.module.css";

const getClassName = (name, isSelected, hasFocus) =>
  `${name}${isSelected ? "_selected" : ""}${hasFocus ? "_focused" : ""}`;

const RadioButton = (props) => {
  const { onClick, isSelected, hasFocus, label } = props;
  const classes = mergeClasses(defaultClasses, props.classes);

  const finalStyle = Object.assign(
    {},
    {},
    {
      "--venia-swatch-bg": isSelected ? "#FFB800" : "",
    }
  );

  const className = classes[getClassName("root", isSelected, hasFocus)];

  return (
    <div onClick={onClick} className={classes.radioButton}>
      <button title={label} className={className}>
        <span style={finalStyle} />
      </button>
      <span className={classes.label}>{label}</span>
    </div>
  );
};

export default RadioButton;
