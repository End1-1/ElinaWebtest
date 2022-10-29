import React from "react";
import defaultClasses from "./languageSelect.module.css";
// import { useLanguageSelect } from "Talons/LanguageSelect/useLanguageSelect";
import { mergeClasses } from "Helper/classify";
import Select from "Components/Select";

const availableLanguages = [
  { code: "111", nameInEnglish: "ENG" },
  { code: "222", nameInEnglish: "ARM" },
  { code: "333", nameInEnglish: "RUS" },
];

const LanguageSelect = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  // const {
  //   currentLanguage,
  //   handleLanguageChange,
  //   availableLanguages,
  // } = useLanguageSelect();

  const languages = availableLanguages.map((langugage) => {
    return {
      value: langugage ? langugage.code : "",
      label: langugage ? langugage.nameInEnglish : "",
    };
  });

  return (
    <div className={classes.root}>
      <Select
        options={languages}
        onChange={(languages) => languages}
        defaultValue="111"
        classes={{ root: classes.languageSelect, open: classes.open }}
      />
    </div>
  );
};

export default LanguageSelect;
