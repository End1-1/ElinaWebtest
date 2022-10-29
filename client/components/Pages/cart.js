import React from 'react';
import classes from './cart.module.css';
import CartContent from 'Components/CartContent';
import Card from 'Components/Card';
import Head from '../Head';

const Cart = (props) => {
    return (
        <div className={classes.root}>
            <Head>
                <title>{'Cart'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.body}>
                <div>
                    <Card>
                        <CartContent />
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default {
    component: Cart,
    loadData: () => { }
};