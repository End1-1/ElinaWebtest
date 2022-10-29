import React, { useMemo } from 'react';
import { arrayOf, func, object, shape, string, int } from 'prop-types';
import Swatch from './colorSwatch';

import { mergeClasses } from 'Helper/classify';
import defaultClasses from './colorSwatchList.module.css';

const SwatchList = props => {
    const { selectedValue = {}, items, onSelectionChange, from } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const swatches = useMemo(
        () =>
            items.map((item, index) => {
                const isSelected = item.id === selectedValue;
                if(index > 4 && from !== "productPage") {
                    return;
                }
                else {
                    return (
                        <Swatch
                            key={item.id}
                            isSelected={isSelected}
                            item={item}
                            onClick={onSelectionChange}
                        />
                    );
                }
            }),
        [selectedValue.label, items, onSelectionChange]
    );

    return (
        <div className={classes.root}>
            {swatches}
            {from !== "productPage" && items.length > 5 ? <div className={classes.more}>+</div> : null}
        </div>
    );
};

SwatchList.propTypes = {
    classes: shape({
        root: string
    }),
    getItemKey: func,
    selectedValue: int,
    items: arrayOf(object),
    onSelectionChange: func
};

SwatchList.displayName = 'SwatchList';

export default SwatchList;