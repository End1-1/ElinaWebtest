import React from 'react';
import classes from './cart.module.css';
import CartContent from 'Components/CartContent';
import Card from 'Components/Card';
import Head from 'Components/Head';
import { useTranslations } from 'Talons/App/useTranslations';

const Cart = (props) => {
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <Head>
                <title>{__('cart')}</title>
            </Head>
            <div className={classes.body}>
                <CartContent />
            </div>
        </div>
    );
}

export default {
    component: Cart,
    loadData: () => { }
};