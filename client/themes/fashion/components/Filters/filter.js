import React, { useMemo, useState } from 'react';

import classes from './filter.module.css';
import SwatchList from './swatchList';
import Dropdown from './dropdown';
import Slider from './slider';
import Icon from 'Components/Icon';

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

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`${isOpen ? classes.open : ''} ${classes.root}`}>
            <p onClick={() => setIsOpen(!isOpen)}>
                <span className={classes.title}>{filter.name}</span>
                <Icon name='chevron-down' />
            </p>
            <div className={classes.optionBlock}>
                <ValueList
                    items={filter.options}
                    {...filter}
                    onSelectionChange={(newValue, replace = false) => { handleFilterChange(code, newValue, replace) }}
                    value={value}
                />
            </div>
        </div>
    );
};

Filter.defaultProps = {
    selectLabel: "product's quantity"
};

export default Filter;
