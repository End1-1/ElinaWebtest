import React from 'react';
import defaultClasses from './totals.module.css';
import { useTotals } from 'Talons/Totals/useTotals';
import Price from 'Components/Price';
import { mergeClasses } from 'Helper/classify';


const Totals  = props => {
    const { 
        cart,
        __
    } =  useTotals();

    const classes = mergeClasses(defaultClasses, props.classes);
    
    return (
        <div className={classes.root}>
            <div className={classes.total}>
                <span>{__("my.order.totals.subtotal")}</span>
                <span><Price amount={cart.subtotal} /></span>
            </div>
            <div className={classes.shippingTotal}>
                <span>{__("my.order.totals.shipping")}</span>
                <span><Price amount={cart.shippingTotal} /></span>
            </div>
            {cart.discounts && cart.discounts.map(discount => 
                <div key={discount.name} className={classes.total}>
                    <span>{discount.name}</span>
                    <span><Price amount={discount.amount} /></span>
                </div>
            )}
            <div className={`${classes.total} ${classes.grandTotal}`}>
                <span>{__("my.order.totals.grand.total")}</span>
                <span><Price amount={cart.grandTotal} /></span>
            </div>
        </div>
    );
}

export default Totals;