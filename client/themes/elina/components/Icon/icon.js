import React from 'react';
import defaultClasses from './icon.module.css';
import { mergeClasses } from 'Helper/classify';

const Icon  = props => {
    const { 
        name,
        onClick,
        size
    } = props;
    const classes = mergeClasses(defaultClasses,  props.classes);

    return (
        <span onClick={onClick} style={{ fontSize: `${size}` }} className={`${classes.icon} ${classes['icon-' + name]}`}></span>
    );
};

export default Icon;