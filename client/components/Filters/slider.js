import React, { useState } from 'react';

import classes from './slider.module.css';
import InputRange from 'react-input-range';
import { usePrice } from 'Talons/Price/usePrice';


const Slider = props => {
    const { value = [], minValue, maxValue, onSelectionChange } = props;

    if (!minValue && !maxValue) return null;

    const [state, setState] = useState({
        min: parseFloat(minValue),
        max: parseFloat(maxValue),
    });

    const { currencySymbol } = usePrice();

    return (
        <div className={classes.root}>
            <InputRange
                draggableTrack
                minValue={parseFloat(minValue)}
                maxValue={parseFloat(maxValue)}
                formatLabel={value => `${value} ${currencySymbol}`}
                value={state}
                onChange={value => setState(value)} 
                onChangeComplete={value => onSelectionChange([value.min, value.max], true)}
            />
        </div>
    );
};

export default Slider;
