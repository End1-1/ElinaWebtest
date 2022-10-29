import React from "react";
import defaultClasses from "Components/SocialIcons/socialIcons.module.css";
import Icon from "Components/Icon";
import { mergeClasses } from "Helper/classify";

const SocialIcons = (props) => {
  const { icons, data = [] } = props;
  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        {data.map(({ id, label, url }, ind) => (
          <li key={ind} className={classes.listItem}>
            <a
              className={`${classes.anchor} ${id || ""}`}
              target="_blank"
              href={url}
            >
              <Icon name={icons[ind]} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialIcons;
