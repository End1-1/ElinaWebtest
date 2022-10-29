import React from "react";
import Link from "Components/Link";
import defaultClasses from "./list.module.css";
import { mergeClasses } from "Helper/classify";

const List = (props) => {
  const { data = [] } = props;
  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <ul className={classes.root}>
      {data.map(({ text, link, id = "" }, ind) => {
        return (
          <li key={id || ind} className={classes.item}>
            <Link className={classes.link} to={link}>
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
