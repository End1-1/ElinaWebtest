import React, { useMemo } from 'react';
import { useSort } from 'Talons/Toolbar/useSort';
import Select from 'Components/Select';
import defaultClasses from './sort.module.css';
import { mergeClasses } from 'Helper/classify';

const Sort = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        value, 
        dir,
        isEnabled,
        // dropdownOption,
        handleChange,
        handleDirSwitch
    } = useSort(props);

    if (!isEnabled || !value) {
        return null;
    }
    const dropdownOption = useMemo(() => (
    [
        {
            value: "date",
            label: "home.new.collection.title",
            dir: "desc"
        },
        {
            value: "name",
            label: "sort.by.name.a-z",
            dir: "asc"
        },
        {
            value: "name",
            label: "sort.by.name.z-a",
            dir: "desc"
        },
        {
            value: "price",
            label: "sort.by.price.low.to.high",
            dir: "asc"
        },
        {
            value: "price",
            label: "sort.by.price.high.to.low",
            dir: "desc"
        }
    ]), []);

    return (
        <div className={classes.root}>
            <Select options={dropdownOption} onChange={handleChange} handleDirSwitch={handleDirSwitch} fromCategory={{label: "sort.by"}}/>
        </div>
    );
}

export default Sort;