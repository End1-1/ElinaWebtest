import React from 'react';
import classes from './page.module.css';
import CheckoutContent from 'Components/CheckoutContent';
import Head from 'Components/Head';
import { useTranslations } from 'Talons/App/useTranslations';

const Checkout = () => {
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <Head>
                <title>{__('checkout')}</title>
            </Head>
            <div className={classes.body}>
                <CheckoutContent />
            </div>
        </div>
    );
}

export default {
    component: Checkout,
    loadData: () => { }
};