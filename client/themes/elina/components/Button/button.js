import React from 'react';
import defaultClasses from './button.module.css';
import { mergeClasses } from 'Helper/classify';
import { bool } from 'prop-types';

const Button  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { 
        priority,
        loading,
        iconOnly,
        onClick,
        disabled,
        type
    } = props;

    return (
        <button onClick={onClick} type={type} disabled={disabled} className={`${classes.button} ${classes[priority]} ${iconOnly ? classes.iconOnly : ''}`} size={'tiny'}>
            {props.children}
            {loading && <span>...</span>}
        </button>
    );
}

Button.defaultProps = {
    priority: 'primary',
    iconOnly: false,
    type: 'button'
}

Button.propTypes = {
    iconOnly: bool
}

export default Button;