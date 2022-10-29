import React from 'react';
import defaultClasses from './loading.module.css';
import loading from './elinaLoading.svg';
import { mergeClasses } from 'Helper/classify';

const Loading = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <img src={loading}/>
        </div>
    );
};

export default Loading;