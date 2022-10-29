import React from 'react';
import defaultClasses from './signInGoogle.module.css';
import { GoogleLogin } from 'react-google-login';
import { useSignInGoogle } from 'Talons/SignInGoogle/useSignInGoogle';
import { mergeClasses } from 'Helper/classify';

const SignInGoogle  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        getIsEnabled,
        getClientId,
        handleSuccess,
        handleFail,
        __
    } = useSignInGoogle();

    if (!getIsEnabled() || !getClientId()) {
        return null;
    }
    return (
        <div className={classes.root}>
            <GoogleLogin
                clientId={getClientId()}
                buttonText={__('sign.in.with.google')}
                onSuccess={handleSuccess}
                onFailure={handleFail}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default SignInGoogle;