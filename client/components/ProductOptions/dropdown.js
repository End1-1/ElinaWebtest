import React, { useMemo } from 'react';
import { mergeClasses } from 'Helper/classify';
import defaultClasses from 'Components/ProductOptions/dropdown.module.css';
import { useOption } from 'Talons/ProductOptions/useOption';
import Select from 'Components/Select';

const Dropdown = props => {
    const { selectedValue = {}, items, onSelectionChange, label } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const valuesDropdownOptions = useMemo(() => {
        if (!items) return [];
        const options = [];
        items.map((item, index) => {
            options.push({
                label: item.label,
                value: item.id,
            });
        });
        return options;
    }, [items]);
    
    return (
        <div className={classes.root}>
            <Select
                // selection
                placeholder={'Select Option'}
                options={valuesDropdownOptions}
                onChange={(value) => onSelectionChange(value)}
            />
        </div>
    );
};

export default Dropdown;
