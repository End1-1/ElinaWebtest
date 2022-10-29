import React from 'react';

import classes from './dropdown.module.css';


const Dropdown = props => {
    const { value = [], items, onSelectionChange } = props;

    return (
        <div className={classes.root}>
            <ul>
            {items && items.map(item => 
                <li key={item.id} className={`${classes.item} ${value.includes(item.id) ? classes.active : ''}`} onClick={() => onSelectionChange(item.id)}>
                    {item.name}
                    <span>({item.resultCount})</span>
                </li> 
            )}
            </ul>
        </div>
    );
};

export default Dropdown;
