import React, { useMemo } from 'react';
import { arrayOf, func, object, shape, string } from 'prop-types';
import Swatch from './swatch';
import { mergeClasses } from 'Helper/classify';
import defaultClasses from 'Components/ProductOptions/swatchList.module.css';

const SwatchList = props => {
    const { selectedValue = {}, items, onSelectionChange } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const swatches = useMemo(
        () =>
            items.map(item => {
                const isSelected = item.id === selectedValue;

                return (
                    <Swatch
                        key={item.id}
                        isSelected={isSelected}
                        item={item}
                        onClick={onSelectionChange}
                    />
                );
            }),
        [selectedValue.label, items, onSelectionChange]
    );

    return <div className={classes.root}>{swatches}</div>;
};

SwatchList.propTypes = {
    classes: shape({
        root: string
    }),
    getItemKey: func,
    selectedValue: string,
    items: arrayOf(object),
    onSelectionChange: func
};

SwatchList.displayName = 'SwatchList';

export default SwatchList;
