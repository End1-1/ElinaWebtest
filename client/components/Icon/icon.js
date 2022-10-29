import React from 'react';
import classes from './icon.module.css';

const Icon  = props => {
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