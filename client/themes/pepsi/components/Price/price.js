import React from 'react';
import classes from './price.module.css';
import { usePrice } from 'Talons/Price/usePrice';

const Price  = props => {
    const { amount, discountedAmount, discount, discountType, className } = props;
    const { 
        currencySymbol
    } =  usePrice();

    if (discountedAmount) {
        return (
            <span className={`${classes.root} ${className || ''}`}>
                <span className={classes.oldPrice}>{amount} {currencySymbol}</span>
                {currencySymbol}{discountedAmount}
            </span>
        );
    }
    
    return (
        <span className={`${classes.root} ${className || ''}`}>
            {currencySymbol}{amount}
        </span>
    );
}

export default Price;