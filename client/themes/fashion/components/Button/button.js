import React from 'react';
import defaultClasses from './button.module.css';
import { mergeClasses } from 'Helper/classify';
import { bool } from 'prop-types';

const Button  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { 
        text,
        priority,
        loading,
        iconOnly,
        onClick,
        disabled
    } = props;

    return (
        <button onClick={onClick} disabled={disabled} className={`${classes.button} ${classes[priority]} ${iconOnly ? classes.iconOnly : ''}`} size={'tiny'}>
            {props.children}
            {text}
            {loading && <span>...</span>}
        </button>
    );
}

Button.defaultProps = {
    priority: 'primary',
    iconOnly: false
}

Button.propTypes = {
    iconOnly: bool
}

export default Button;