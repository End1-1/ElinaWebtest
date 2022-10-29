import React, { useState, useEffect, useCallback, useRef } from 'react';
import defaultClasses from './select.module.css';
import { func, array, string } from 'prop-types';
import { mergeClasses } from 'Helper/classify';
import IconMoon from 'Components/IconMoon';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { useTranslations } from 'Talons/App/useTranslations';

const Select = (props) => {
    const { options, onChange, placeholder, defaultValue, handleDirSwitch, label, fromCategory } = props;
    const { __ } = useTranslations();
    const classes = mergeClasses(defaultClasses, props.classes);
    const optionsWithPlaceholder = placeholder ? [{ value: null,label: placeholder }, ...options] : options;
    const defaultValueObject = defaultValue ? optionsWithPlaceholder.find(option => option.value == defaultValue) : optionsWithPlaceholder[0];
    const [currentValue, setCurrentValue] = useState(defaultValueObject);
    const [isOpen, setIsOpen] = useState(false); 
    const selectDiv = useRef();
    useOnClickOutside(selectDiv, () => { if(isOpen) setIsOpen(!isOpen) });

    const toggling = () => setIsOpen(!isOpen);
    const onOptionClicked = useCallback(value => {
        setIsOpen(!isOpen);
        setCurrentValue(value);
        if (handleDirSwitch) {
            handleDirSwitch(value.dir);
        }
    }, [handleDirSwitch, setCurrentValue, setIsOpen, isOpen]);

    useEffect(() => {
        if (currentValue && currentValue.value) {
            if(fromCategory && handleDirSwitch) {
                handleDirSwitch(currentValue.dir);
            }
            onChange(currentValue.value);
        }
    }, [currentValue]);

    return (     
        <div className={classes.root} onClick={toggling} ref={selectDiv}>
            {label ? <span className={classes.selectLabel}>{label}</span> : null}  
            <div className={classes.currentLabelField} >
                <span className={classes.currentLabel}>{currentValue ? fromCategory ? __(currentValue.label) : currentValue.label : ""}</span>
                <IconMoon name="arrow" classes={{icon: classes.downArrow}}/>
            </div>
                <ul className={isOpen ? classes.list : classes.hiddenList}>
                    {optionsWithPlaceholder
                            .filter(a =>  a.value != '' )
                            .map((option,index)=> (
                                <li onClick={() => onOptionClicked(option)} key={index} value={option.value} className={classes.item}>
                                    {fromCategory ? __(option.label) : option.label}
                                </li>
                            )
                        )
                    }
                </ul>
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