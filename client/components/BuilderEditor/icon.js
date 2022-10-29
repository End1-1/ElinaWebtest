import React from 'react';
import defaultClasses from './icon.module.css';
import { mergeClasses } from 'Helper/classify';

const Icon  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { 
        name,
        size
    } = props;

    return (
        <span className={`${classes.icon} builder-icon ${classes['icon-' + name]}`} style={{ fontSize: `${size}px` }}></span>
    );
}

Icon.defaultProps = {
    size: '16'
}


export default Icon;