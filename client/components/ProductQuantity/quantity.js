import React from 'react';
import { arrayOf, number, shape, string, func } from 'prop-types';
import { mergeClasses } from 'Helper/classify';
import defaultClasses from 'Components/ProductQuantity/quantity.module.css';
import { useQuantity } from 'Talons/Quantity/useQuantity';

const Quantity = props => {
    const { selectLabel, initialValue, onValueChange, maxQuantity, ...restProps } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        handleDec, 
        handleInc
    } = useQuantity({
        initialValue,
        onValueChange,
        maxQuantity
    });

    return (
        <div className={classes.root}>
            <span className={classes.value}>{initialValue}</span>
            <div className={classes.actions}>
                <span onClick={handleInc} className={classes.increment}/>
                <span onClick={handleDec} className={classes.decrement}/>
            </div>
        </div>
    );
};
Quantity.propTypes = {
    classes: shape({
        root: string
    }),
    items: arrayOf(
        shape({
            value: number
        })
    ),
    initialValue: number,
    onValueChange: func
};

Quantity.defaultProps = {
    selectLabel: "product's quantity"
};

export default Quantity;
