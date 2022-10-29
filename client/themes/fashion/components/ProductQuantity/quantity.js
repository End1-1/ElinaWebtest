import React from 'react';
import { arrayOf, number, shape, string, func } from 'prop-types';
import { mergeClasses } from 'Helper/classify';
import defaultClasses from './quantity.module.css';
import { useQuantity } from 'Talons/Quantity/useQuantity';
import Icon from 'Components/Icon';

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
            <span onClick={handleDec} className={classes.decrement}><Icon name='minus' /></span>
            <div className={classes.value}>{initialValue}</div>
            <span onClick={handleInc} className={classes.increment}><Icon name='plus' /></span>
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
