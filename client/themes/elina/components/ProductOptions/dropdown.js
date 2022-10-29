import React, { useMemo } from 'react';
import {
    arrayOf,
    func,
    number,
    object,
    oneOfType,
    shape,
    string,
    bool
} from 'prop-types';

import { mergeClasses } from 'Helper/classify';
import SwatchList from './swatchList';
import TileList from './tileList';
import defaultClasses from './dropdown.module.css';
import { useOption } from 'Talons/ProductOptions/useOption';
// import { Dropdown as SemanticDropdown } from 'semantic-ui-react';
import Select from 'Components/Select';

const getItemKey = ({ value_index }) => value_index;

// TODO: get an explicit field from the API
// that identifies an attribute as a swatch
const getListComponent = (attribute_code, values) => {
    const optionType = getOptionType({ attribute_code, values });

    return optionType === 'swatch' ? SwatchList : TileList;
};

const Dropdown = props => {
    const { selectedValue = {}, items, onSelectionChange, label } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const valuesDropdownOptions = useMemo(() => {
        if (!items) return [];
        const options = [];
        items.map((item, index) => {
            options.push({
                label: item.label,
                value: item.id,
            });
        });
        return options;
    }, [items]);
    
    return (
        <div className={classes.root}>
            <Select
                // selection
                placeholder={'Select Option'}
                options={valuesDropdownOptions}
                onChange={(value) => onSelectionChange(value)}
            />
        </div>
    );
};

export default Dropdown;
