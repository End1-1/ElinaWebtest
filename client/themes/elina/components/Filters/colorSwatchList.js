import React, { useMemo, useState } from 'react';
import { arrayOf, func, object, shape, string } from 'prop-types';
import ColorSwatch from './colorSwatch';

import { mergeClasses } from 'Helper/classify';
import defaultClasses from './colorSwatchList.module.css';

const ColorSwatchList = props => {
    const { value = [], items, onSelectionChange } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const [showMore, setShowMore] = useState(false);

    const swatches = useMemo(
        () =>
            items.map((item, index) => {
                const isSelected = value.includes(item.id);
                if(!showMore) {
                    if(index > 19) {
                        return;
                    }
                    return (
                        <ColorSwatch
                            key={item.id}
                            isSelected={isSelected}
                            item={item}
                            onClick={onSelectionChange}
                        />
                    );
                }
                else {
                    return (
                        <ColorSwatch
                            key={item.id}
                            isSelected={isSelected}
                            item={item}
                            onClick={onSelectionChange}
                        />
                    )
                }
            }),
        [items, onSelectionChange, showMore]
    );

    return (
        <div className={classes.root}>
            {swatches}
            {items.length > 20 ? <div className={`${classes.more} ${showMore && classes.showMore}`} onClick={() => setShowMore(!showMore)}>{showMore ? "-" : "+"}</div> : null}
        </div>
    )
};

ColorSwatchList.propTypes = {
    classes: shape({
        root: string
    }),
    getItemKey: func,
    items: arrayOf(object),
    onSelectionChange: func
};

ColorSwatchList.displayName = 'ColorSwatchList';

export default ColorSwatchList;
