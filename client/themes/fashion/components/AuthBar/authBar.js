import React, { useEffect, useCallback, Fragment, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classes from './authBar.module.css';
import Link from 'Components/Link';
import { signOut } from 'Store/actions/auth';
import { useTranslations } from 'Talons/App/useTranslations';
import Icon from 'Components/Icon';
import Modal from 'Components/Modal';
import SignIn from 'Components/SignIn';
import SignUp from 'Components/SignUp';
import { useHistory } from 'react-router-dom';

const AuthBar  = props => {
    const { __ } = useTranslations();
    const history = useHistory();
    const dispatch = useDispatch();
    const { isSignedIn } = useSelector(state => state.auth);

    const [openModal, setIsOpenModal] = useState(false);
    const [signInSignUp, setIssignInSignUp] = useState('signIn');

    const closeModal = () => {
        setIsOpenModal(false);
    }

    const showSignInSignUp = (element) => {
        setIssignInSignUp(element);
    }

    

    const handleSignOut = useCallback(() => {
        dispatch(signOut());
        closeModal();
    }, []);
    
    return (
        <React.Fragment>
            {isSignedIn ?
                <span className={classes.userLink}>
                    <Link to="/">
                        <span className={classes.signOutLink} onClick={handleSignOut}>
                            <Icon name="logout" />
                        </span>
                    </Link>
                    <Link to="/account/dashboard">
                        <Icon name="user" />
                    </Link>
                </span>
                :
                <span className={classes.userLink} onClick={() => {setIsOpenModal(!openModal)}}>
                    <Icon name="user" />
                </span>
            }
            {!isSignedIn &&
                <div className={classes.signInModal}>
                    <Modal
                        open={openModal}
                        onClose={closeModal}
                        classes={{close: classes.close, content: classes.content}}>
                        <div className={classes.titles}>
                            <span className={signInSignUp == 'signIn' ? classes.active : ''} onClick={() => showSignInSignUp('signIn')}>{__('sign.in')}</span>
                            <span className={signInSignUp == 'signUp' ? classes.active : ''} onClick={() => showSignInSignUp('signUp')}>{__('sign.up')}</span>
                        </div>
                        <div className={classes.signInSignUpBlock}>
                            {signInSignUp == 'signIn' &&
                            <div>
                                <SignIn />
                                <div className={classes.signInsignUp}>
                                    <span>{__('Don’t have an Account?')}</span>
                                    <span onClick={() => showSignInSignUp('signUp')}>{__('Sign Up')}</span>
                                </div>
                            </div>
                            }
                            {signInSignUp == 'signUp' &&
                            <div>
                                <SignUp />
                                <div className={classes.signInsignUp}>
                                    <span>{__('Already have an Account?')}</span>
                                    <span onClick={() => showSignInSignUp('signIn')}>{__('Sign In here')}</span>
                                </div>
                            </div>
                            }
                        </div>
                    </Modal>
                </div>
            }
        </React.Fragment>
    );
}

export default AuthBar;