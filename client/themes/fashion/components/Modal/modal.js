import React from 'react';
import defaultClasses from './modal.module.css';
import { bool, func } from 'prop-types';
import { mergeClasses } from 'Helper/classify';

const Modal = (props) => {

    const {closeIcon, children, open, onClose} = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={`${classes.root} ${open ? classes.open : ''}`}>
            <div className={classes.overlay} onClick={onClose} />
            <div className={classes.content}>
                <span className={`${classes.close} ${closeIcon ? classes.closeIcon : ''}`} onClick={onClose}>{closeIcon}</span>
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    open: bool.isRequired,
    onClose: func.isRequired
}

export default Modal;
