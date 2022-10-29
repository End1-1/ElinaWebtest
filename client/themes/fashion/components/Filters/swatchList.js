import React, { useMemo } from 'react';
import { arrayOf, func, object, shape, string, int } from 'prop-types';
import Swatch from './swatch';

import { mergeClasses } from 'Helper/classify';
import defaultClasses from './swatchList.module.css';

const SwatchList = props => {
    const { value = [], items, onSelectionChange } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const swatches = useMemo(
        () =>
            items.map(item => {
                const isSelected = value.includes(item.id);

                return (
                    <Swatch
                        key={item.id}
                        isSelected={isSelected}
                        item={item}
                        onClick={onSelectionChange}
                    />
                );
            }),
        [items, onSelectionChange]
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
