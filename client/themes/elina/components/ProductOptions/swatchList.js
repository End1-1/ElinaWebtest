import React, { useMemo } from 'react';
import { arrayOf, func, object, shape, string, int } from 'prop-types';
import Swatch from './swatch';
import { mergeClasses } from 'Helper/classify';
import defaultClasses from './swatchList.module.css';
import orderBy from 'lodash/orderBy';

const SwatchList = props => {
    const { selectedValue = {}, items, onSelectionChange, selectedVariant, variant, variants, selectedValues, attributeId } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const swatches = useMemo(
        () =>
            orderBy(items, "label", "asc").map(item => {
                const isSelected = item.id === selectedValue;

                return (
                    <Swatch
                        key={item.id}
                        isSelected={isSelected}
                        item={item}
                        variant={variant}
                        onClick={onSelectionChange}
                        variants={variants}
                        selectedValues={selectedValues}
                        attributeId={attributeId}
                    />
                );
            }),
        [selectedValue.label, items, onSelectionChange, selectedVariant]
    );

    return <div className={classes.root}>{swatches}</div>;
};

SwatchList.propTypes = {
    classes: shape({
        root: string
    }),
    getItemKey: func,
    items: arrayOf(object),
    onSelectionChange: func
};

SwatchList.displayName = 'SwatchList';

export default SwatchList;