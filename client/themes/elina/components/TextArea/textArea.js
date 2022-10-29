import React from 'react';
import defaultClasses from './textArea.module.css';
import { mergeClasses } from 'Helper/classify';

const TextArea  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { value, className, hasError } = props;
    return (
        <div className={classes.root}>
            <textarea {...props} className={`${classes.input} ${className || ''} ${hasError ? classes.errorInput : null}`}>
                {value}
            </textarea>
        </div>
    );
}

export default TextArea;