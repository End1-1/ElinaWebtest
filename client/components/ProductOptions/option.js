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
import SwatchList from 'Components/ProductOptions/swatchList';
import Dropdown from 'Components/ProductOptions/dropdown';
import defaultClasses from './option.module.css';
import { useOption } from 'Talons/ProductOptions/useOption';

// TODO: get an explicit field from the API
// that identifies an attribute as a swatch
const getListComponent = (type) => {
    switch (type) {
        case 'colorSwatch': 
            return SwatchList;
        default:
            return Dropdown;
    }
};

const Option = props => {
    const {
        attributeCode,
        type,
        attributeId,
        label,
        onSelectionChange,
        selectedValue,
        values,
        showOptionLabels
    } = props;


    const talonProps = useOption({
        attributeId,
        label,
        onSelectionChange,
        selectedValue,
        values
    });

    const {
        handleSelectionChange,
        initialSelection,
        selectedValueLabel,
        selectedValueDescription
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const ValueList = useMemo(() => getListComponent(type), [
        type
    ]);
    return (
        <div className={classes.root}>
            {showOptionLabels && <p className={classes.title}>
                <span>{label}</span>
            </p>}
            <ValueList 
                items={values} 
                onSelectionChange={handleSelectionChange}
                selectedValue={selectedValue}
                label={label}
            />
        </div>
    );
};

Option.propTypes = {
    attribute_id: string,
    classes: shape({
        root: string,
        title: string
    }),
    label: string.isRequired,
    onSelectionChange: func,
    selectedValue: oneOfType([number, string]),
    values: arrayOf(object).isRequired,
    showOptionLabels: bool
};

export default Option;
