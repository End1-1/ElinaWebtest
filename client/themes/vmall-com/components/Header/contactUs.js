import React from 'react';
import Icon from 'Components/Icon';
import classes from './contactUs.module.css';

const ContactUs = (props) => {
    return (
        <a href="tel: 8002225500" className={props.isMobile ? classes.phoneMobile : classes.phoneDesktop}>
            <Icon name={'phone'} />
            <span className={classes.number}>(800) 222-5500</span>
        </a>
    );
}

export default ContactUs;