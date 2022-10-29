import React, { useCallback } from 'react';
import classes from './stage.css';

const Stage = (props) => {
    const { item } = props;

    return (
        <div className={classes.root}>
            {[1, 2].map(testimonial => 
                <div className={classes.item}>
                    <div className={classes.image}></div>
                    <div className={classes.main}>
                        <div className={classes.rating} />
                        <div className={classes.name} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Stage;