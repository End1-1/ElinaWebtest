import React from 'react';
import {mergeClasses} from 'Helper/classify';
import defaultClasses from './radioButton.module.css'
import {useSwatch} from 'Talons/ProductOptions/useSwatch';

const getClassName = (name, isSelected, hasFocus) =>
    `${name}${isSelected ? '_selected' : ''}${hasFocus ? '_focused' : ''}`;

const RadioButton = props => {
    const {
        onClick,
        isSelected,
        hasFocus,
        onSelectionChange
    } = props;
    const classes = mergeClasses(defaultClasses,props.classes)
    const {
        id: valueId,
        label,

    } = props.item;
    const talonProps = useSwatch({
        onClick,
        valueId
    });
    const { handleClick } = talonProps;

    const finalStyle = Object.assign({}, {}, {
        '--venia-swatch-bg': isSelected ? "#FFB800" : ""
    });

    const className = classes[getClassName('root', isSelected, hasFocus)];


    return (
        <div
            onClick={handleClick}
             className={classes.radioButton}>
            <button
                title={label}
                className={className}
            >
                <span style={finalStyle}></span>
            </button>
            <span className={classes.label}>{label}</span>
        </div>
    );
};

export default RadioButton;