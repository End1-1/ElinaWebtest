import React from 'react';
import defaultClasses from './totals.module.css';
import Price from 'Components/Price';
import { mergeClasses } from 'Helper/classify';
import { useTranslations } from 'Talons/App/useTranslations';

const Totals  = props => {  
    const classes = mergeClasses(defaultClasses, props.classes);
    const { order } = props;  
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <div className={classes.total}>
                <span>{__('my.order.totals.subtotal')}</span>
                <span><Price amount={order.subtotal} /></span>
            </div>
            <div className={classes.total}>
                <span>{__('my.order.totals.shipping')}</span>
                <span><Price amount={order.shippingTotal} /></span>
            </div>
            {order.discounts && order.discounts.map(discount => 
                <div key={discount.name} className={classes.total}>
                    <span>{discount.name}</span>
                    <span><Price amount={discount.amount} /></span>
                </div>
            )}
            <div className={`${classes.total} ${classes.grandTotal}`}>
                <span>{__('my.order.totals.grand.total')}</span>
                <span><Price amount={order.grandTotal} /></span>
            </div>
        </div>
    );
}

export default Totals;