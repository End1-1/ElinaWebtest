import React from 'react';
import defaultClasses from './totals.module.css';
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
            <h4 className={classes.heading}>{'Order summary'}</h4>
            <div className={classes.content}>
                <div className={`${classes.total} ${classes.subtotal}`}>
                    <span>Subtotal</span>
                    <span><Price amount={cart.subtotal} /></span>
                </div>
                <div className={classes.total}>
                    <span>Shipping</span>
                    <span><Price amount={cart.shippingTotal} /></span>
                </div>
                {cart.discounts && cart.discounts.map(discount =>
                    <div key={discount.name} className={classes.total}>
                        <span>{discount.name}</span>
                        <span><Price amount={discount.amount} /></span>
                    </div>
                )}
                <div className={`${classes.total} ${classes.grandTotal}`}>
                    <span>Grand Total</span>
                    <span><Price amount={cart.grandTotal} /></span>
                </div>
            </div>
        </div>
    );
}

export default Totals;