import React, { Fragment } from 'react';
import classes from 'Components/AuthBar/authBar.module.css';
import Link from 'Components/Link';
import { useAuthBar } from 'Talons/AuthBar/useAuthBar';

const AuthBar  = props => {
    const {
        handleSignOut,
        isSignedIn,
        __
    } = useAuthBar({
        redirectPath: '/'
    });
    
    return (
        <div className={classes.root}>
            {isSignedIn ? 
                <Fragment>
                    <span className={classes.signOutLink} onClick={handleSignOut}>{__('sign.out')}</span>
                    <Link to="/account">{__('my.account')}</Link>
                </Fragment> : 
                <Fragment>
                    <Link to="/signIn">{__('sign.in')}</Link>
                    <Link to="/signUp">{__('sign.up')}</Link>
                </Fragment>
            }
        </div>
    );
}

export default AuthBar;