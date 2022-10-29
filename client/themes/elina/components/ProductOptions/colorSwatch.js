import React, { useMemo } from 'react';
import {
    bool,
    func,
    number,
    object,
    oneOfType,
    shape,
    string
} from 'prop-types';

import { mergeClasses } from 'Helper/classify';

import defaultClasses from './colorSwatch.module.css';

import { useSwatch } from 'Talons/ProductOptions/useSwatch';

const getClassName = (name, isSelected, hasFocus) =>
    `${name}${isSelected ? '_selected' : ''}${hasFocus ? '_focused' : ''}`;

// Swatches _must_ have a 1x1 aspect ratio to match the UI.
const SWATCH_WIDTH = 48;

const Swatch = props => {
    const {
        onClick,
        isSelected,
        hasFocus
    } = props;

    const { 
        id: valueId,
        swatch,
        label 
    } = props.item;

    const talonProps = useSwatch({
        onClick,
        valueId
    });

    const { handleClick } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const finalStyle = Object.assign({}, {}, {
        '--venia-swatch-bg': swatch
    });

    const className = classes[getClassName('root', isSelected, hasFocus)];

    return (
        <div
            onClick={handleClick}
            title={label}
            className={className}
        >
            <div className={classes.color} style={finalStyle}></div>
        </div>
    );
};

Swatch.propTypes = {
    hasFocus: bool,
    isSelected: bool,
    item: shape({
        label: string.isRequired
    }).isRequired,
    onClick: func.isRequired,
    style: object,
    swatch_data: object
};

Swatch.defaultProps = {
    hasFocus: false,
    isSelected: false
};

export default Swatch;