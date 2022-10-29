import React from 'react';
import defaultClasses from './textInput.module.css';
import { mergeClasses } from 'Helper/classify';
import { string } from 'prop-types';

const TextInput  = props => {

    const { label } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={`${classes.root} ${label ? classes.inFloatLabel : ''}`}>
            <input {...props} className={classes.input} />
            { label && <label className={classes.floatLabel}>{label}</label> }
        </div>
    );
}

TextInput.propTypes = {
    label: string,
}

export default TextInput;