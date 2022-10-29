import React from 'react';
import classes from './icon.module.css';

const Icon  = props => {
    const { 
        name,
    } = props;

    return (
        <span className={`${classes.icon} ${classes['icon-' + name]}`}></span>
    );
}

export default Icon;