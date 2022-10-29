import React from 'react';
import classes from './checkoutSuccessPage.css';
import Card from '../Card';
import { Helmet } from 'react-helmet';

const CheckoutSuccessPage = (props) => {
    return (
        <div className={classes.root}>
            <Helmet>
                <title>{'Checkout'}</title>
            </Helmet>
            <div className={classes.body}>
                <div>
                    <Card>
                        <p className={classes.successMessage}>Thanks for submiting the order</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default {
    component: CheckoutSuccessPage,
    loadData: () => { }
};