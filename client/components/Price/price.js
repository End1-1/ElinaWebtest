import React from 'react';
import defaultClasses from 'Components/Price/price.module.css';
import { usePrice } from 'Talons/Price/usePrice';
import { mergeClasses } from 'Helper/classify'

const Price  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { amount, discountedAmount, discount, discountType, className } = props;
    const { 
        currencySymbol
    } =  usePrice();

    if (discountedAmount) {
        return (
            <span className={`${classes.root} ${className || ''}`}>
                <span className={classes.oldPrice}>{amount} {currencySymbol}</span>
                {discountedAmount} {currencySymbol}
            </span>
        );
    }
    
    return (
        <span className={`${classes.root} ${className || ''}`}>
            {amount} {currencySymbol}
        </span>
    );
}

export default Price;