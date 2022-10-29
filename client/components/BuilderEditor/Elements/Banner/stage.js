import React, { useCallback } from 'react';
import classes from './stage.css';

const Stage = (props) => {
    const { item } = props;

    console.log('item', item);
    
    return (
        <div className={classes.root}>
            Banner with id {item.settings.bannerId}
        </div>
    )
}

export default Stage;