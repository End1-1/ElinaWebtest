import React, { useMemo } from 'react';

import classes from './filter.module.css';
import ColorSwatchList from './colorSwatchList';
import SwatchList from './swatchList';
import Dropdown from './dropdown';
import Slider from './slider';
import { useTranslations } from 'Talons/App/useTranslations';

const getListComponent = (type) => {
    switch (type) {
        case 'swatch':
            return SwatchList;
        case 'colorSwatch': 
            return ColorSwatchList;
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
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <p className={classes.filterName}>{__(filter.code)}</p>
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
