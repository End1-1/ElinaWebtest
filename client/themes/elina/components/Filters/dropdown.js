import React, { useMemo, useState, useEffect } from 'react';
import classes from './dropdown.module.css';
import CheckBox from 'Components/CheckBox';
import { useTranslations } from 'Talons/App/useTranslations';

const Dropdown = props => {
    const { value = [], items, onSelectionChange } = props;
    const [values, setValues] = useState([]);
    const [isAll, setIsAll] = useState(true);
    const { __ } = useTranslations();

    const elements = useMemo(() => items.map(item => { 
        return {
            ...item,
            label: `${item.name} (${item.resultCount})`,
        }
    }), items);

    useEffect(() => {
        if(value.length && !isAll && !values.length) {
            setValues(value);
        }
    }, [value, isAll]);

    useEffect(() => {
        if(value.length && value.length !== items.length) {
            setValues(value);
            setIsAll(false);
        }
        else 
        if(!value.length){
            setIsAll(true);
        }
    }, [value]);

    return (
        <div className={classes.root}>
            {elements && [{ label: "All", value: isAll }, ...elements].map(item => 
                <CheckBox
                    key={item.id}
                    label={item.label === "All" ? __("all") : item.label}
                    value={item.label === "All" ? item.value : values.includes(item.id)}
                    onChange={() => {
                        if(item.label === "All" && (!values.length ||  values.length === items.length)) {
                            return;
                        }
                        if(!values.includes(item.id) && values.length === items.length - 1 || item.label === "All") {
                            setIsAll(true)
                            setValues([]);
                            items.map(it => {
                                if(!value.includes(it.id)) {
                                    onSelectionChange(it.id);
                                }
                            })
                        }
                        else 
                        if(isAll) {
                            setIsAll(false);
                            if(value.length) {
                                items.map(it => {
                                    if(it.id !== item.id) {
                                        onSelectionChange(it.id);
                                    }  
                                })
                            }
                            else {
                                onSelectionChange(item.id);
                            }
                        }
                        else {
                            onSelectionChange(item.id);
                        }
                    }}
                />
            )} 
        </div>
    );
};

export default Dropdown;
