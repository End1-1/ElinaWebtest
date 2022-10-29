import React, { useEffect } from 'react';
import defaultClasses from './main.module.css';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { mergeClasses } from 'Helper/classify';
import Drawer from 'Components/Drawer';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import { useLocation } from 'react-router-dom';
import { fetchTranslations } from 'Store/actions/app';
import { useDispatch, useSelector } from 'react-redux';

const Main  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { drawer } = useDrawer();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const localeCode = useSelector(state => state.shop.currentLanguage);

    useEffect(() => {
        dispatch(fetchTranslations(localeCode))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

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