import React, { useCallback } from 'react';
import { bool, func, number, shape, string } from 'prop-types';

import { mergeClasses } from 'Helper/classify';
import defaultClasses from './tile.module.css';

const Tile = props => {
    const { isActive, number, onClick } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isActive ? classes.root_active : classes.root;
    const handleClick = useCallback(() => onClick(number), [onClick, number]);

    return (
        <div className={classes.wrapper}>
            <button className={rootClass} onClick={handleClick}>
                {number}
            </button>
        </div>
    );
};

Tile.propTypes = {
    classes: shape({
        root: string,
        root_active: string
    }),
    isActive: bool,
    number: number,
    onClick: func
};

export default Tile;
