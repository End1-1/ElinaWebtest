import React, { useCallback } from 'react';
import classes from 'Components/Dropdown/dropdown.module.css';

const Dropdown  = props => {
    const { options, onChange } = props;

    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <div className={classes.root}>
            <select onChange={handleChange}>
                {options.map(({ text, value }) => 
                    <option key={value} value={value}>{text}</option>    
                )}
            </select>
        </div>
    );
}

export default Dropdown;