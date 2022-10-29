import React from 'react';
import defaultClasses from './checkBox.module.css';
import { mergeClasses } from 'Helper/classify';
import IconMoon from 'Components/IconMoon';

const CheckBox = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <label className={`${props.isCheckout || props.isSignUp ? classes.labelForCheckout : classes.checkBox_label}`}>
                <input type="checkbox" name="color" value={props.value} onChange={props.onChange} checked={props.value}/>
                <div className={props.isCheckout || props.isSignUp ? classes.checkboxCircleForCheckout : classes.checkboxCircle}>{props.isCheckout || props.isSignUp ? <IconMoon name="checked"/> : <span></span> }</div>
                <span>{props.label}</span>
            </label>
        </div>
    );
};

export default CheckBox;