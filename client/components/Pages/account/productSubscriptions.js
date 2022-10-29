import React from 'react';
import defaultClasses from './productSubscriptions.css';
import Head from 'Components/Head';
import { mergeClasses } from 'Helper/classify';
import ProductSubscriptionsComponent from 'Components/MyAccount/productSubscriptions';

const ProductSubscriptions = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes)
    return (
        <div className={classes.root}>
            <Head>
                <title>{'Product Subscriptions'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.body}>
                <ProductSubscriptionsComponent/>
            </div>
        </div>
    );
}

export default {
    component: ProductSubscriptions,
    loadData: () => { }
};