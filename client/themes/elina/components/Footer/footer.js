import React, { useCallback, useMemo, Fragment, useState } from 'react';
import defaultClasses from './footer.module.css';
import { mergeClasses } from 'Helper/classify';
import Contacts from './contacts';
import Logo from 'Components/Logo';
import Block from 'Components/Block';
import { useLink } from 'Talons/Link/useLink';
import { useHistory } from 'react-router';
import useWindowSize from 'Hooks/useWindowSize';
import { useTranslations } from 'Talons/App/useTranslations';
import SignInModal from 'Components/Header/signInModal';
import { useSelector } from 'react-redux';

const Footer = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const history = useHistory();
    const { getLocalizedUrl } = useLink();
    const { width } = useWindowSize();
    const { __ } = useTranslations();
    const [signInSignUp, setIssignInSignUp] = useState('');
    const { isSignedIn } = useSelector(state => state.auth);

    const handleClick = useCallback((e) => {
        e.preventDefault();
        if (e.target.href) {
            const url =  new URL(e.target.href)
            const splitted = url.pathname.split("/");
            if(splitted.length && splitted[2]) {
                if(splitted[2] === "sign-up") {
                    if(isSignedIn) {
                        history.push('/account');
                    }
                    else {
                        history.push("/");
                        setIssignInSignUp('signUp');
                    }
                }
                else
                if(splitted[2] === "sign-in") {
                    if(isSignedIn) {
                        history.push('/account');
                    }
                    else {
                        history.push("/");
                        setIssignInSignUp('signIn');
                    }
                }
            }
            else {
                history.push(url.pathname);
            }
        }
    }, [isSignedIn]);

    const showSignInSignUp = (element) => {
        setIssignInSignUp(element);
    }

    const BLOCKS = useMemo(() => {
        let blocks;
        if(width <= 768) {
            blocks = <Fragment>
                        <div className={classes.item} onClick={handleClick}>
                            <Block blockId="607ed57955827425d9b8edc0"/>
                        </div>
                        <div className={classes.column}>
                            <div className={classes.item} onClick={handleClick}>
                                <Block blockId="607ed7f855827425d9b8edc2"/>
                            </div>
                    <div className={classes.item} onClick={handleClick}>
                            <Block blockId="6339fe4ccd353d050f87ef98"/>
                            <Contacts/>
                        </div>
                        </div>
                    </Fragment>
        }
        else
        if(width <= 1050) {
            blocks = <Fragment>
                        <div className={classes.item} onClick={handleClick}>
                            <Block blockId="607ed57955827425d9b8edc0"/>
                        </div>
                        <div className={classes.item} onClick={handleClick}>
                            <Block blockId="607ed7f855827425d9b8edc2"/>
                        </div>
                        <div className={classes.column}>
                            <div className={classes.item} onClick={handleClick}>
                                <Block blockId="604f06c486ff8dacd86e0745"/>
                            </div>
                    <div className={classes.item} onClick={handleClick}>
                            <Block blockId="6339fe4ccd353d050f87ef98"/>
                            <Contacts/>
                        </div>
                        
                        </div>
                    </Fragment>

        }
        else {
            blocks = <Fragment>
                        <div className={classes.item} onClick={handleClick}>
                            <Block blockId="607ed57955827425d9b8edc0"/>
                        </div>
                        <div className={classes.item} onClick={handleClick}>
                            <Block blockId="607ed74855827425d9b8edc1"/>
                        </div>
                        <div className={classes.item} onClick={handleClick}>
                            <Block blockId="607ed7f855827425d9b8edc2"/>
                        </div>
                    <div className={classes.item} onClick={handleClick}>
                            <Block blockId="6339fe4ccd353d050f87ef98"/>
                            <Contacts/>
                        </div>
                        
                    </Fragment>
        }
        return blocks;
    }, [width, isSignedIn]);
 
    return (
        <footer className={classes.root}>
            <div className={width <= 768 ? classes.bodyMobile : classes.body}>
                {BLOCKS}
            </div>
            {/*
            <div className={classes.logoField}>
                <Logo/>
            </div>
            */}
            <div className={classes.bottomField}>
                <span className={classes.bottomText}>
                    <span className={classes.sign}>©</span>
                    <span>{__("footer.all.right.recerved")}</span>
                </span>
            </div>
        
            {signInSignUp 
                ?   <SignInModal 
                        openModal={!!signInSignUp} 
                        closeModal={() => setIssignInSignUp("")}
                        signInSignUp={signInSignUp}
                        showSignInSignUp={showSignInSignUp}
                    />
                :   null
            }
        </footer>
    )
};

export default Footer;