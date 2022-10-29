import React from 'react';
import { usePerPage } from 'Talons/Toolbar/usePerPage';
import Select from 'Components/Select';
import defaultClasses from './perPage.module.css';
import { mergeClasses } from 'Helper/classify';

const PerPage = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        value, 
        isEnabled,
        dropdownOption,
        handleChange
    } = usePerPage(props);

    if (!isEnabled || !value) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Select defaultValue={value} options={dropdownOption} onChange={handleChange} />
        </div>
    );
}

export default PerPage;