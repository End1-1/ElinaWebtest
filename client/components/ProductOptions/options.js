import React from 'react';
import { array, func, bool, object } from 'prop-types';
import Option from 'Components/ProductOptions/option';
import { useOptions } from 'Talons/ProductOptions/useOptions';

const Options = props => {
    const { 
        classes, 
        onSelectionChange, 
        options, 
        selectedValues = new Map(), 
        showOptionLabels,
        // Sometimes we will want to show part of the options only, for example on listing pages
        // if visibleOptions=true, that means all should be visible
        visibleOptions
    } = props;
    
    const talonProps = useOptions({
        onSelectionChange,
        selectedValues
    });

    const { handleSelectionChange, selectedValueMap } = talonProps;

    // Render a list of options passing in any pre-selected values.
    return options.filter(option => visibleOptions === true || visibleOptions.includes(option.attributeId)).map(option => (
        <Option
            {...option}
            classes={classes}
            key={option.attributeId}
            onSelectionChange={handleSelectionChange}
            selectedValue={selectedValues.get(option.attributeId)}
            showOptionLabels={showOptionLabels}
        />
    ));
};

Options.propTypes = {
    onSelectionChange: func,
    options: array.isRequired,
    selectedValues: object,
    showOptionLabels: bool
};

Options.defaultProps = {
    showOptionLabels: false,
    visibleOptions: []
};

export default Options;
