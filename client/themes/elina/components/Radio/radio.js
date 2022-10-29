import React from 'react';
import { mergeClasses } from 'Helper/classify';
import defaultClasses from './radio.module.css';

const Radio = ({elements, onChange, name, value, classes: classObj}) => {
    const onChangeHandler = ( item) => {
        onChange(item.value);
    };
    const classes = mergeClasses(defaultClasses, classObj);
    return (
        <div>
            {
                elements.map((item, index) => {
                    return (
                        <label className={`${classes.radio}`} key={`radio_item-${item.value}-${index}`}>
                            <input name={name}
                                   value={item.value}
                                   type={"radio"}
                                   onChange={() => onChangeHandler( item)}
                                   checked={item.value === value}/>
                                   <div className={`${classes.checkmarkWrapper}`}>
                                       <span className={classes.checkmark}></span>
                                   </div>
                            <span className={`${classes.radioLabel}`}>{item.label}</span>
                        </label>
                    )
                })
            }

        </div>
    );
};

export default Radio;
