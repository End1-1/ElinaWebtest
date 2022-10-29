import React from 'react';
import classes from './loading.module.css';

const Loading  = props => {
    return (
        <div className={classes.root}>
            <img src="/images/loading.svg" />
        </div>
    );
}

export default Loading;