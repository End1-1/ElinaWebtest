import React from 'react';
import classes from './message.module.css';

const Message  = props => {
    const { 
        type,
        containerClass
    } = props;

    return (
        <div className={`${classes.root} ${classes[type]} ${containerClass || ''}`}>
            {props.children}
        </div>
    );
}

Message.defaultProps = {
    type: 'success'
}

export default Message;