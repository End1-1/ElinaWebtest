import React from 'react';
import defaultClasses from './iconMoon.module.css';
import {mergeClasses} from 'Helper/classify';

const IconMoon  = props => {
    const { 
        name,
        onClick,
        size
    } = props;
    const classes = mergeClasses(defaultClasses,  props.classes);

    return (
        <span 
            onClick={onClick}
            className={`${classes.icon} ${classes['icon-' + name]} ${classes.iconClass}`}
        >
        </span>
    );
};

export default IconMoon;