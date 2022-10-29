import React, { useEffect } from 'react';
import defaultClasses from './modal.module.css';
import { bool, func } from 'prop-types';
import { mergeClasses } from 'Helper/classify';
import IconMoon from 'Components/IconMoon';

const Modal = (props) => {
    const {closeIcon, children, open, onClose} = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        }
        return () => document.body.style.overflow = 'auto'
    }, [open]);

    return (
        <div className={`${classes.root} ${open ? classes.open : ''}`}>
            <div className={classes.overlay} onClick={onClose} />
            <div className={classes.content}>
            <div className={classes.closeIconField} onClick={onClose}>
                <IconMoon name="close" classes={{icon: classes.closeIcon}} />
            </div>
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
