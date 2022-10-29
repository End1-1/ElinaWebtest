import React from 'react';
import defaultClasses from './main.module.css';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { mergeClasses } from 'Helper/classify';
import Drawer from 'Components/Drawer';
import { useDrawer } from 'Talons/Drawer/useDrawer';

const Main  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { drawer } = useDrawer();

    return (
        <div className={`${classes.root} ${drawer ? classes.open : ''}`}>
            <Drawer />
            <Header />
            {props.children}
            <Footer />
        </div>
    );
}

export default Main;