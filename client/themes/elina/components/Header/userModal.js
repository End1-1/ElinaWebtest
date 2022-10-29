import React, { useState } from 'react';
import { mergeClasses } from 'Helper/classify';
import defaultClasses from './userModal.module.css';
import Link from 'Components/Link';
import IconMoon from 'Components/IconMoon';
import { useTranslations } from 'Talons/App/useTranslations';

const UserModal = (props) => {
    const {isSignedIn, handleSignOut, setIssignInSignUp, isMobile } = props;

    const [isOpen, setIsOpen] = useState(false);
    const classes = mergeClasses(defaultClasses, props.classes);
    const { __ } = useTranslations();

    if(isSignedIn) {
        if(isMobile) {
            return (
                <div className={classes.userModalFieldMobile}>
                    <div className={`${classes.userModalCurrentItem} ${isOpen && classes.selected}`} onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen)}}>
                        <span>{__("my.account")}</span>
                        <div className={`${classes.downArrow} ${isOpen && classes.isOpenArrow}`}>
                            <IconMoon name="arrow"/>
                        </div>
                    </div>
                    {
                        isOpen && 
                        <div className={classes.userModalFieldMobile}>
                            <Link to="/account">
                                <div className={classes.item}>
                                    {__("my.account")}
                                </div>
                            </Link>
                            <Link to="/account/orders">
                                <div className={classes.item}>
                                    {__("my.orders.heading")}
                                </div>
                            </Link>
                            <Link to="/account/addresses">
                                <div className={classes.item}>
                                    {__('my.addresses.account.tab')}
                                </div>
                            </Link>
                            <Link to="/">
                                <div className={classes.item} onClick={handleSignOut}>
                                    {__("sign.out")}
                                </div>
                            </Link>
                        </div>
                    }
                </div>
            )
        }
        else {
            return (
                <div className={classes.userModalField}>
                     <Link to="/account">
                        <div className={classes.userModalItem}>
                            {__("my.account")}
                        </div>
                    </Link>
                    <Link to="/account/orders">
                        <div className={classes.userModalItem}>
                            {__("my.orders.heading")}
                        </div>
                    </Link>
                    <Link to="/">
                        <div className={classes.userModalItem} onClick={handleSignOut}>
                            {__("sign.out")}
                        </div>
                    </Link>
                </div>
            )
        }
    }
    else
    if(isMobile) {
        return (
            <div className={classes.userModalFieldMobile}>
                <div className={`${classes.userModalCurrentItem} ${isOpen && classes.selected}`} onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen)}}>
                    <span>{__("my.account")}</span>
                    <div className={`${classes.downArrow} ${isOpen && classes.isOpenArrow}`}>
                        <IconMoon name="arrow"/>
                    </div>
                </div>
                {
                    isOpen &&
                    <div userModalFieldMobile>
                        <div 
                            className={classes.item} 
                            onClick={() => setIssignInSignUp("signIn")}
                        >
                            {__("sign.in")}
                        </div>
                        <div 
                            className={classes.item}
                            onClick={() => setIssignInSignUp("signUp")}
                        >
                            {__("sign.up")}
                        </div>
                    </div>
                }
            </div>
        )
    }
    else {
        return (
            <div className={classes.userModalField}>
                <div 
                    className={classes.userModalItem} 
                    onClick={() => setIssignInSignUp("signIn")}
                >
                    {__("sign.in")}
                </div>
                <div 
                    className={classes.userModalItem}
                    onClick={() => setIssignInSignUp("signUp")}
                >
                    {__("sign.up")}
                </div>
            </div>
        )
    }
}

export default UserModal;