import React from 'react';
import defaultClasses from './drawer.module.css';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import NavDrawer from 'Components/NavDrawer';
import { mergeClasses } from 'Helper/classify';

const Drawer = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { drawer } = useDrawer();

    return (
        <div className={`${classes.root} ${drawer ? classes.open : ''}`}>
            {drawer == 'nav' && <NavDrawer />}
        </div>
    );
}

export default Drawer;