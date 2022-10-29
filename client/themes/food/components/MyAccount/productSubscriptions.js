import React from 'react';
import defaultClasses from 'Components/MyAccount/productSubscriptions.css';
import Tabs from 'Components/MyAccount/tabs';
import { mergeClasses } from 'Helper/classify';
import { useProductSubscriptions } from 'Talons/ProductSubscriptions/useProductSubscriptions';
import ProductSubscriptionsContent from 'Components/ProductSubscriptionsContent'

const ProductSubscriptions  = props => {
    const classes = mergeClasses(defaultClasses, props.classes)   
    const { items, isFetching, __ } = useProductSubscriptions();

    return (
        <div className={classes.root}>
            <Tabs active={'subscriptions'} />
            <div className={classes.content}>
                <h3>{__('Product Subscriptions')}</h3>
                <div className={classes.body}>
                    <ProductSubscriptionsContent items={items} isFetching={isFetching}/>
                </div>
            </div>
        </div>
    );
}

export default ProductSubscriptions;