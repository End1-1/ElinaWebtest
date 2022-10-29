import React from 'react';
import IconMoon from 'Components/IconMoon';
import { mergeClasses } from 'Helper/classify';
import defaultClasses from './contactUs.module.css';
import { useConfig } from 'Talons/App/useConfig';

const ContactUs = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { getConfigValue } = useConfig();
    const storePhone = getConfigValue("storePhone");

    return (
        <a href={`tel:${storePhone}`} className={props.isMobile ? classes.phoneMobile : classes.phoneDesktop}>
                <IconMoon name={'phone'}  classes={{icon: classes.phoneIcon}}/>
            <span className={classes.number}>{storePhone}</span>
        </a>
    );
}

export default ContactUs;