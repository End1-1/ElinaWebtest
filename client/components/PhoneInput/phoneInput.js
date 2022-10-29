import React from 'react';
import classes from './phoneInput.module.css';
import PhoneInputOriginal from 'react-phone-input-2';
import './style.css';

const PhoneInput  = props => {
    return (
        <PhoneInputOriginal
            {...props}
        />
    );
}

export default PhoneInput;