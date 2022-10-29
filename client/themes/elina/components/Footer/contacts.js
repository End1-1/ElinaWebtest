import React from 'react';
import defaultClasses from './contacts.module.css';
import { mergeClasses } from 'Helper/classify';
import Logo from 'Components/Logo';
import { useConfig } from 'Talons/App/useConfig';
import IconMoon from 'Components/IconMoon';
import ContactUs from 'Components/Header/contactUs';
import fbIcon from './Facebook.png';
import instaIcon from './insta.png';
import telegramIcon from './telegram.png'
import idramIcon from './idram.png';
import masterCardIcon from './mastercard.png';
import vizaIcon from './vizacard.png'

const Contacts = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { getConfigValue } = useConfig();
    const storeEmail = getConfigValue("storeEmail");
    const socialPages = getConfigValue("socialPages");

    return (
        <div className={classes.root}>
        {/*
            <div className={classes.phoneField}>
                <ContactUs classes={{icon: classes.phone}}/>
            </div>
            <div className={classes.emailField}>
                <IconMoon name="email" classes={{icon: classes.email}}/>
                <span className={classes.emailText}>{storeEmail}</span>
            </div>
        */}
            <div className={classes.socialField}>
                {
                   socialPages && socialPages.length
                   ?    socialPages.map((e, i) => {
                            return (
                                <a href={e.url} key={i}>
                                    {
                                        e.socialId.includes("facebook")
                                        ?   <img src={fbIcon}/>
                                        :   e.socialId.includes("instagram")
                                        ?   <img src={instaIcon} className={classes.instagram}/>
                                        :   e.socialId.includes("telegram")
                                        ?   <img src={telegramIcon} className={classes.telegram}/>
                                        :   null
                                    }
                                </a>
                            )
                        })
                   :    null
                }
            </div>
            <div className={classes.cardField}>
                <img src={vizaIcon} className={classes.vizaCard}/>
                <img src={masterCardIcon} className={classes.masterCard}/>
                <img src={idramIcon} className={classes.idram}/>
            </div>
        </div>
    )
};

export default Contacts;