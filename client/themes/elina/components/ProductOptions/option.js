import React, { useMemo, useState } from 'react';
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
import Dropdown from './dropdown';
import defaultClasses from './option.module.css';
import { useOption } from 'Talons/ProductOptions/useOption';
import ColorSwatchList from './colorSwatchList'; 
import Modal from 'Components/Modal';
import SizeGuide from 'Components/SizeGuide';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
// TODO: get an explicit field from the API
// that identifies an attribute as a swatch
const getListComponent = (type) => {
    switch (type) {
        case 'colorSwatch': 
            return ColorSwatchList;
        case 'swatch': 
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
        showOptionLabels,
        variant,
        variants,
        selectedValues,
        product,
        fromListingPage,
        from
    } = props;
    const talonProps = useOption({
        attributeId,
        label,
        onSelectionChange,
        selectedValue,
        values,
        product,
        fromListingPage
    });
    const {
        handleSelectionChange,
        initialSelection,
        selectedValueLabel,
        selectedValueDescription,
        __
    } = talonProps;
    const [isOpen, setIsOpen] = useState(false);
    const classes = mergeClasses(defaultClasses, props.classes);
    const { productChart } = useSelector(state => state.product);

    const ValueList = useMemo(() => getListComponent(type), [
        type
    ]);
    const selectedLabel = useMemo(() => {
        const selectedVariant = values && values.length 
        ?  values.find(e => e.id == selectedValue)
        :  null;

        return selectedVariant ? selectedVariant.label : null
    },[values, selectedValue])

    return (
        <div className={classes.root}>
            {type === "swatch" && productChart && !isEmpty(productChart) ? <p className={classes.sizeGuide} onClick={() => setIsOpen(true)}>{__("size.chart")}</p> : null}
            <div className={classes.titleField}>
                {showOptionLabels 
                &&  <p className={classes.title}>
                        <span>{__(label.toLowerCase())}</span>: {selectedLabel}
                    </p>
                }
            </div>
            <ValueList
                attributeId={attributeId}
                items={values}
                onSelectionChange={handleSelectionChange}
                selectedValue={selectedValue}
                variants={variants}
                label={label}
                variant={variant}
                selectedValues={selectedValues}
                from={from}
            />
            {isOpen && 
                <Modal
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    classes={{content: classes.sizeGuideContent, closeIconField: classes.closeIcon}}
                >
                    <SizeGuide data={productChart}/>
                </Modal>
            }          
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
