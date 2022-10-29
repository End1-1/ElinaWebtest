import React from 'react';
import defaultClasses from './textInput.module.css';
import { mergeClasses } from 'Helper/classify';
import { string } from 'prop-types';

const TextInput  = props => {

    const { label, hasError } = props;

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={`${classes.root} ${label ? classes.inFloatLabel : ''} ${hasError ? classes.rootError : null}`}>
            {label && <span className={classes.inputLabel}>{label}</span>}
            <input {...props} className={`${classes.input} ${hasError ? classes.inputError : null}`} />
        </div>
    );
}

TextInput.propTypes = {
    label: string,
}

export default TextInput;