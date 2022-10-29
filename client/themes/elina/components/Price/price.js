import React from 'react';
import defaultClasses from './price.module.css';
import { usePrice } from 'Talons/Price/usePrice';
import { mergeClasses } from 'Helper/classify'

const Price  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { amount, discountedAmount, discount, discountType, className,oldPrice } = props;
    const { 
        currencySymbol
    } =  usePrice();

    if (discountedAmount) {
        return (
            <span className={`${classes.root} ${classes.discounted}`}>
                <div className={classes.discountedNewPrice}>
                    <span className={classes.discountedAmount}>
                        {discountedAmount} 
                    </span>
                    <span className={classes.discountedSymbol}>
                        {currencySymbol}
                    </span>
                </div>
                <div className={classes.discountedOldPrice}>
                    <span className={classes.discountedAmount}>
                        {amount}
                    </span>
                    <span className={classes.discountedSymbol}>
                        {currencySymbol}
                    </span>
                </div>
            </span>
        );
    }
    
    return (
        <span className={`${classes.root}`}>
            <div className={classes.newPrice}>
                <span className={classes.amount}>
                    {amount} 
                </span>
                <span className={classes.symbol}>
                    {currencySymbol}
                </span>
            </div>
        </span>
    );
}

export default Price;