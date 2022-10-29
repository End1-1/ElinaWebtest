import React from 'react';
import classes from './portal.module.css';
import { createPortal } from 'react-dom';
import { usePortal } from 'Hooks/usePortal';


const Portal = (props) => {
    const { id, children } = props;

    const target = usePortal(id);
    return createPortal(
        children,
        target,
    );
}

export default Portal;