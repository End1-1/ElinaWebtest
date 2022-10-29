import React from 'react';
import classes from 'Components/Card/card.module.css';

const Card  = props => {
    return (
        <div className={classes.root}>{props.children}</div>
    );
}

export default Card;