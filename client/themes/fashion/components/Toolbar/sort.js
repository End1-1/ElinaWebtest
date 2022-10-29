import React from 'react';
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
        dropdownOption,
        handleChange,
        handleDirSwitch
    } = useSort(props);

    if (!isEnabled || !value) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Select defaultValue={value} options={dropdownOption} onChange={handleChange} />
            <span className={classes.dir} onClick={handleDirSwitch}>{dir}</span>
        </div>
    );
}

export default Sort;