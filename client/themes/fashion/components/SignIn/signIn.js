import React from 'react';
import classes from './signIn.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import Link from 'Components/Link';
import { useSignIn } from 'Talons/SignIn/useSignIn';
import PhoneInput from 'Components/PhoneInput';
import PasswordReset from 'Components/SignIn/passwordReset';
import PasswordForget from 'Components/SignIn/passwordForget';
import SignUpConfirm from 'Components/SignUp/signUpConfirm';
import Message from 'Components/Message';
import Icon from 'Components/Icon';
import SignInGoogle from 'Components/SignInGoogle';
import SignInFacebook from 'Components/SignInFacebook';

const SignIn  = props => {
    const {
        formik,
        message,
        setMessage,
        showConfirmation,
        setShowConfirmation,
        isSubmitting,
        showResetPassword,
        cognitoUser,
        handleResetSuccess,
        showForgetPassword,
        setShowForgetPassword,
        handleResetPasswordSuccess,
        __
    } = useSignIn({
        asPage: false
    })

    let content = (
        <React.Fragment>
            <form className={classes.root} onSubmit={formik.handleSubmit}>
                <div className={classes.fields}>
                    {formik.values.phoneOrEmail == 'phone' ? <div className={classes.field}>
                        <PhoneInput
                            value={formik.values.phoneNumber}
                            onChange={phone => formik.setFieldValue('phoneNumber', phone ? `+${phone}` : '' )}
                            containerClass={classes.phoneFieldContainer}
                            inputClass={classes.phoneFieldInput}
                            specialLabel={''}
                            inputProps={{
                                autoFocus: true
                            }}
                        />
                        {formik.errors.phoneNumber && formik.touched.phoneNumber ? (<div className={classes.validationError}>{formik.errors.phoneNumber}</div>) : null}
                    </div> : <div className={classes.field}>
                        <TextInput
                            type={'email'}
                            name="email"
                            className={classes.input}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder={__('email.or.phone')}
                            label={__('email')}
                            autoFocus={true}
                        />
                        {formik.errors.email && formik.touched.email ? (<div className={classes.validationError}>{formik.errors.email}</div>) : null}
                    </div>}
                    <div className={classes.field}>
                        <TextInput type="password"
                                   icon="key"
                                   name="password"
                                   placeholder={__('password')}
                                   label={__('password')}
                                   className={classes.input}
                                   value={formik.values.password}
                                   onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password ? (<div className={classes.validationError}>{formik.errors.password}</div>) : null}
                    </div>
                </div>
                <div className={classes.socialLogins}>
                    <SignInGoogle />
                    <SignInFacebook />
                </div>
                <span className={classes.submitBtn}>
                <Button type={'submit'} loading={isSubmitting} priority={'primary'}>
                    {__('submit')}
                    <Icon name='right' />
                    </Button>
            </span>
            </form>
            <div className={classes.actions}>
                <Button onClick={() => setShowForgetPassword(true)}>{__('Forget Password?')}</Button>
            </div>
        </React.Fragment>
    );

    if (showResetPassword) {
        content = <PasswordReset cognitoUser={cognitoUser} oldPassword={formik.values.password} afterSuccess={handleResetSuccess} />;
    } else if (showConfirmation) {
        const { phoneOrEmail, phoneNumber, email } = formik.values;
        content = <SignUpConfirm 
            phoneNumber={formik.values.phoneNumber} 
            username={phoneOrEmail == 'phone' ? phoneNumber : email}
            setShowConfirmation={setShowConfirmation} 
            setMessage={setMessage} 
        />;
    } else if (showForgetPassword) {
        content = <PasswordForget
            phoneNumber={formik.values.phoneNumber}
            setShowForgetPassword={setShowForgetPassword}
            afterSuccess={handleResetPasswordSuccess}
        />;
    }

    return (
        <div className={classes.root}>
            {content}
            {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
        </div>
    );
}

export default SignIn;