import React from 'react';
import defaultClasses from './textArea.module.css';
import { mergeClasses } from 'Helper/classify';

const TextInput  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { value, className } = props;
    return (
        <div className={classes.root}>
            <textarea {...props} className={`${classes.input} ${className || ''}`}>
                {value}
            </textarea>
        </div>
    );
}

export default TextInput;