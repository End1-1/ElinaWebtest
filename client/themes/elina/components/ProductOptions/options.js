import React from 'react';
import { array, func, bool } from 'prop-types';

import Option from './option';
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
        visibleOptions,
        variants,
        variant,
        product,
        fromListingPage,
        from
    } = props;
    
    const talonProps = useOptions({
        onSelectionChange,
        selectedValues
    });

    const { handleSelectionChange, selectedValueMap } = talonProps;
    // Render a list of options passing in any pre-selected values.
    return options.filter(option => visibleOptions === true || visibleOptions.includes(option.attributeId)).map(option => {
        // console.log("option.attributeId", option.attributeId);
        // console.log("optionID", selectedValues.get(option.attributeId))
        return(
            <Option
                {...option}
                variants={variants}
                classes={classes}
                variant={variant}
                key={option.attributeId}
                onSelectionChange={handleSelectionChange}
                selectedValue={selectedValues.get(option.attributeId)}
                selectedValues={selectedValues}
                showOptionLabels={showOptionLabels}
                product={product}
                fromListingPage={fromListingPage}
                from={from}
            />
        )
    });
};

Options.propTypes = {
    onSelectionChange: func,
    options: array.isRequired,
    selectedValues: array,
    showOptionLabels: bool
};

Options.defaultProps = {
    showOptionLabels: false,
    visibleOptions: []
};

export default Options;
