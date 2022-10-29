import React, { useState, useEffect, Fragment } from 'react';
import Menu from 'Components/Menu';
import classes from './header.module.css';
import Minicart from 'Components/Minicart';
import Logo from 'Components/Logo';
import Search from 'Components/Search';
import NavTrigger from 'Components/Header/navTrigger';
import { useConfig } from 'Talons/App/useConfig';
import LanguageSelect from 'Components/LanguageSelect';
import useWindowSize from 'Hooks/useWindowSize';
import Icon from 'Components/Icon';
import Modal from 'Components/Modal';
import SignIn from 'Components/SignIn';
import SignUp from 'Components/SignUp';
import { useTranslations } from 'Talons/App/useTranslations';
import Button from 'Components/button';

const Header  = props => {
    const { width } = useWindowSize();
    const { getConfigValue } = useConfig();
    const { __ } = useTranslations();
    const [drawer, setDrawer] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [signInSignUp, setSignInSignUp] = useState('signIn');
    const [openResetPassword, setOpenResetPassword] = useState(false)
    const closeDrawer = () => setDrawer(false);
    const closeSearch = () => setIsOpenSearch(false);
    const closeModal = () => setIsOpenModal(false);
    const showSignInSignUp = element => setSignInSignUp(element);
    useEffect(() => {
        if (drawer || isOpenSearch) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }, [drawer, isOpenSearch]);
    return (
        <div className={classes.root}>
            <div className={classes.topContainer}>
                {width > 768 && 
                    <Fragment>
                        <a href={`tel: ${getConfigValue("pepsiHeaderTelephone")}`} className={classes.phoneDesktop}>
                            <span className={classes.number}>{`Call: ${getConfigValue("pepsiHeaderTelephone")}`}</span>
                        </a>
                        <p className={classes.topHeaderText}>{getConfigValue("pepsiHeaderTopMessage")}</p>
                    </Fragment>
                }
                <LanguageSelect />
            </div>
            <div className={classes.border}></div>
            <div className={isOpenSearch ? classes.middleMobile : classes.middle}>
                {width < 768 && !isOpenSearch && <span className={classes.menuIcon} onClick={() => setDrawer(!drawer)}><Icon name="menu"/></span>}
                {!isOpenSearch && <Logo />}
                <div className={classes.middleRight}>
                    <Search isOpen={isOpenSearch} setIsOpen={setIsOpenSearch}/>
                    {isOpenSearch && <span className={classes.closeIcon} onClick={() => closeSearch(false)}><Icon name="close"/></span>}
                    {width > 768 && <span className={classes.user} onClick={() => setIsOpenModal(!isOpenModal)}><Icon name="user"/></span>}
                    {!isOpenSearch && <Minicart />}
                </div>
            </div>
           {width > 768 && 
                <div className={classes.bottom}>
                    <Menu />
                </div>
            }
            <NavTrigger isOpen={drawer} onClick={closeDrawer}/>
            {(drawer || isOpenSearch) && <Backdrop onClick={drawer ? closeDrawer : closeSearch} />}
            <div className={classes.signInModal}>
                <Modal
                    open={isOpenModal}
                    onClose={closeModal}
                    classes={{close: classes.close, content: classes.content}}
                >
                    {!openResetPassword && <div className={classes.titles}>
                            <span className={signInSignUp == 'signIn' ? classes.active : ''} onClick={() => showSignInSignUp('signIn')}>{__('sign.in')}</span>
                            <span className={signInSignUp == 'signUp' ? classes.active : ''} onClick={() => showSignInSignUp('signUp')}>{__('sign.up')}</span>
                        </div>
                    }
                    <div className={classes.signInSignUpBlock}>
                        {signInSignUp == 'signIn' &&
                            <div>
                                <SignIn setOpenResetPassword={setOpenResetPassword}/>
                                <div className={classes.signInsignUp}>
                                    <span>{__('New customer?')}</span>
                                    <Button 
                                        priority="secondary" 
                                        onClick={() => {showSignInSignUp('signUp'); setOpenResetPassword(false)}}
                                        classes={{button: classes.createAccountBtn}}
                                    >
                                        {__('CREATE AN ACCOUNT')}
                                    </Button>
                                </div>
                            </div>
                        }
                        {signInSignUp == 'signUp' &&
                            <div>
                                <SignUp />
                                <div className={classes.signUpDiv}>
                                    <span>{__('Already have an Account?')}</span>
                                    <span onClick={() => showSignInSignUp('signIn')}>{__('Sign In here')}</span>
                                </div>
                            </div>
                        }
                    </div>                
                </Modal>
            </div>
        </div>
    );
}

const Backdrop = (props) => {
    const { width } = useWindowSize();

    useEffect(() => {
        if(width > 768) {
            props.onClick();
        }
    }, [width]);
    
    return (
        <div className={classes.backdrop} onClick={props.onClick}></div>
    )
};

export default Header;