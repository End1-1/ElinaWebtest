import React from 'react';
import classes from './placeholder.module.css';

const Placeholder  = props => {
    return (
        <div className={classes.root}>
            {[1,2,3,4].map(n => 
                <div className={classes.item} key={n}>
                    <div className={classes.image} />
                    <div className={classes.details} />
                </div>
            )}
        </div>
    );
}

export default Placeholder;