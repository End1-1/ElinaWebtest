import React from 'react';
import defaultClasses from './signInModal.module.css';
import { mergeClasses } from 'Helper/classify'
import Modal from 'Components/Modal';
import SignIn from 'Components/SignIn';
import SignUp from 'Components/SignUp';
import { useTranslations } from 'Talons/App/useTranslations';

const SignInModal = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { openModal, closeModal, signInSignUp, showSignInSignUp, type } = props;
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <Modal
                open={openModal}
                onClose={closeModal}
                classes={{close: classes.close, content: signInSignUp === "signIn" ? classes.content : classes.signUpContent}}>
                <div className={signInSignUp === "signIn" ? classes.signInSignUpBlock : classes.signUpBlock}>
                    {signInSignUp == 'signIn' &&
                        <div>
                            <div className={classes.titles}>
                                <p className={classes.titleText} onClick={() => showSignInSignUp('signUp')}>{__("sign.up")}</p>
                                <span className={classes.border}></span>
                            </div>
                            <SignIn asPage={false} closeModal={closeModal} from ={type}/>
                        </div>
                    }
                    {signInSignUp == 'signUp' &&
                        <div>
                            <div className={classes.titlesSignUp}>
                                <div>
                                    <span className={classes.titleText}>{__("already.have.account")}</span>
                                    <span className={classes.titleLink} onClick={() => showSignInSignUp('signIn')}>{__('log.in.now')}</span>
                                </div>
                                <span className={classes.borderSignUp}></span>
                            </div>
                            <SignUp closeModal={closeModal} showSignInSignUp={showSignInSignUp}/>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default SignInModal;