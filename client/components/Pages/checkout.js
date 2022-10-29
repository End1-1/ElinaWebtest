import React from 'react';
import classes from './page.module.css';
import CheckoutContent from 'Components/CheckoutContent';
import Head from '../Head';
import Card from 'Components/Card';

const Checkout = (props) => {
    return (
        <div className={classes.root}>
            <Head>
                <title>{'Checkout'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.body}>
                <div>
                    <Card>
                        <CheckoutContent />
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default {
    component: Checkout,
    loadData: () => { }
};