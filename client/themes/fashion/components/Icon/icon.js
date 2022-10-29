import React from 'react';
import defaultClasses from './icon.module.css';
import { mergeClasses } from 'Helper/classify';

const Icon  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        name,
        onClick,
        size
    } = props;

    return (
        <span onClick={onClick} style={{ fontSize: `${size}` }} className={`${classes.icon} ${classes['icon-' + name]}`}></span>
    );
}

Icon.defaultProps = {
    size: '16px'
}

export default Icon;