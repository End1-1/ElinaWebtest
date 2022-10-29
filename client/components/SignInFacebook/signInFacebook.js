import React from 'react';
import defaultClasses from './signInFacebook.module.css';
import FacebookLogin from 'react-facebook-login';
import { useSignInFacebook } from 'Talons/SignInFacebook/useSignInFacebook';
import { mergeClasses } from 'Helper/classify';

const SignInFacebook  = props => {
    const { closeModal } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        getIsEnabled,
        getAppId,
        handleResponse,
        __
    } = useSignInFacebook({closeModal});
    
    // if (!getIsEnabled() || !getAppId()) {
    //     return null;
    // }

    return (
        <div className={classes.root}>
            <span className={classes.fbIcon}>f</span>
            <FacebookLogin
                appId={getAppId()}
                fields="name,email,picture"
                onClick={() => {}}
                callback={handleResponse} 
                cssClass={classes.fbButton}
                textButton={__('sign.in.with.facebook')}
            />
        </div>
    );
}

export default SignInFacebook;