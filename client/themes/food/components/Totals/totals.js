import React from 'react';
import defaultClasses from 'Components/Totals/totals.module.css';
import { useTotals } from 'Talons/Totals/useTotals';
import Price from 'Components/Price';
import { mergeClasses } from 'Helper/classify';


const Totals  = props => {
    const { 
        cart
    } =  useTotals();

    const classes = mergeClasses(defaultClasses, props.classes);
    
    return (
        <div className={classes.root}>
            <div className={classes.total}>
                <span className={classes.totalName}>Subtotal</span>
                <span className={classes.price}><Price amount={cart.subtotal} /></span>
            </div>
            <div className={`${classes.total} ${classes.totalShipping}`}>
                <span className={classes.totalName}>Shipping</span>
                <span className={classes.price}><Price amount={cart.shippingTotal} /></span>
            </div>
            {cart.discounts && cart.discounts.map(discount => 
                <div key={discount.name} className={classes.total}>
                    <span className={classes.totalName}>{discount.name}</span>
                    <span className={classes.price}><Price amount={discount.amount} /></span>
                </div>
            )}
            <div className={`${classes.total} ${classes.grandTotal}`}>
                <span className={classes.totalName}>Grand Total</span>
                <span className={classes.price}><Price amount={cart.grandTotal} /></span>
            </div>
        </div>
    );
}

export default Totals;