import React, { useCallback } from 'react';
import classes from './stage.css';

const Stage = (props) => {
    const { item } = props;

    return (
        <div className={classes.root}>
            Logo
        </div>
    )
}

export default Stage;