import React from 'react';
import classes from './signIn.module.css';
import TextInput from '../TextInput';
import Button from '../Button';
import Link from 'Components/Link';
import { useSignIn } from 'Talons/SignIn/useSignIn';
import PhoneInput from 'Components/PhoneInput';
import PasswordReset from './passwordReset';
import PasswordForget from './passwordForget';
import SignUpConfirm from '../SignUp/signUpConfirm';
import Message from '../Message';
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
        asPage: true
    });

    let content = (
        <React.Fragment>
        <form onSubmit={formik.handleSubmit}>
            <h3>{__('sign.in')}</h3>
            <p>{__('Sign in to make orders easily.')}</p>
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
                    placeholder={__('email.or.phone')}
                    className={classes.input} 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoFocus={true}
                />
                {formik.errors.email && formik.touched.email ? (<div className={classes.validationError}>{formik.errors.email}</div>) : null}
            </div>}
            <div className={classes.field}>
                <TextInput type="password" 
                    icon="key"
                    name="password"
                    placeholder={__('password')} 
                    className={classes.input} 
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password ? (<div className={classes.validationError}>{formik.errors.password}</div>) : null}
            </div>
            <div className={classes.socialLogins}>
                <SignInGoogle />
                <SignInFacebook />
            </div>
            <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
        </form>
         <div className={classes.actions}>
            <Button onClick={() => setShowForgetPassword(true)}>{__('Forget Password')}</Button>
            <div className={classes.signUp}>
                <Link to={'/signUp'}><Button color={'teal'}>{__('sign.up')}</Button></Link>
            </div>
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