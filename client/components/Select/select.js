import React, { useState, useEffect } from 'react';
import defaultClasses from 'Components/Select/select.module.css';
import { func, array, string } from 'prop-types';
import { mergeClasses } from 'Helper/classify';

const Select = (props) => {
    const { options, onChange, placeholder, defaultValue } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const optionsWithPlaceholder = placeholder ? [{ value: null,label: placeholder }, ...options] : options;
    const defaultValueObject = defaultValue ? optionsWithPlaceholder.find(option => option.value == defaultValue) : optionsWithPlaceholder[0];
    const [currentValue, setCurrentValue] = useState(defaultValueObject);
    const [isOpen, setIsOpen] = useState(false);    
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => {
        setIsOpen(!isOpen);
        setCurrentValue(value)        
    };

    useEffect(() => {
        if (currentValue && currentValue.value) {
            onChange(currentValue.value);
        }
    }, [currentValue]);

    return (     
        <div className={classes.root}>        
            <div className={isOpen ? classes.open : null}>
                <p onClick={toggling}><span>{currentValue.label}</span></p>
                <ul>
                    {optionsWithPlaceholder.filter(a =>  a.value != '' ).map(option => <li onClick={() => onOptionClicked(option)} key={option.value} value={option.value}>{option.label}</li> )}
                </ul>
            </div>
        </div>           
    )
}

Select.propTypes = {
    options: array.isRequired,
    onChange: func.isRequired,
    placeholder: string,
    defaultValue: string
}

export default Select;

