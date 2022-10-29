import React, { useMemo } from 'react';

import classes from './filter.module.css';
import SwatchList from './swatchList';
import Dropdown from './dropdown';
import Slider from './slider';

const getListComponent = (type) => {
    switch (type) {
        case 'colorSwatch': 
            return SwatchList;
        case 'slider': 
            return Slider;
        default:
            return Dropdown;
    }
};

const Filter = props => {
    const { filter, handleFilterChange, value = [] } = props;

    const { type, code } = filter;

    const ValueList = useMemo(() => getListComponent(type), [
        type
    ]);

    return (
        <div className={classes.root}>
            <p>{filter.name}</p>
            <ValueList 
                items={filter.options} 
                {...filter}
                onSelectionChange={(newValue, replace = false) => { handleFilterChange(code, newValue, replace) }}
                value={value}
            />
        </div>
    );
};

Filter.defaultProps = {
    selectLabel: "product's quantity"
};

export default Filter;
