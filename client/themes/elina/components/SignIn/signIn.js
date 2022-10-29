import React from 'react';
import classes from './signIn.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import { useSignIn } from 'Talons/SignIn/useSignIn';
import PhoneInput from 'react-phone-input-2';
import PasswordReset from 'Components/SignIn/passwordReset';
import PasswordForget from 'Components/SignIn/passwordForget';
import SignUpConfirm from 'Components/SignUp/signUpConfirm';
import IconMoon from 'Components/IconMoon';
import SignInFacebook from 'Components/SignInFacebook';

const SignIn  = props => {
    const { closeModal, from } = props;
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
        showPassword, 
        setShowPassword,
        __
    } = useSignIn({
        asPage: false,
        closeModal,
        from
    })
    let content = (
        <React.Fragment>
            <form className={classes.root} onSubmit={formik.handleSubmit}>
                {
                    message 
                    ?   <div className={message.type =="success" ? classes.successField :  classes.errorField}>
                            <span>
                                {message.text}
                            </span>
                        </div>
                    :   null
                }
                <div className={classes.field}>
                    <TextInput
                        type={'text'}
                        name="phoneOrEmail"
                        value={formik.values.phoneOrEmail}
                        onChange={formik.handleChange}
                        label={__("email.or.phone")}
                        classes={{input: classes.input}}
                        placeholder="+374033123456 / elinaelina@gmail.com"
                    />
                    {formik.errors.phoneOrEmail && formik.touched.phoneOrEmail ? (<div className={classes.validationError}>{formik.errors.phoneOrEmail}</div>) : null}
                </div>
                <div className={classes.field}>
                    <TextInput
                        type={showPassword ? "text" : "password"}
                        icon="key"
                        name="password"
                        label={__('password')}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        classes={{input: classes.passwordInput}}
                    />
                    {showPassword
                    ?   <div className={classes.togglePassword} onClick={() => setShowPassword(false)}>
                            <IconMoon name="hide"/>
                        </div>
                    :   <div className={classes.togglePassword} onClick={() => setShowPassword(true)}>
                            <IconMoon name="show"/>
                        </div>
                    }
                    {formik.errors.password && formik.touched.password ? (<div className={classes.validationError}>{formik.errors.password}</div>) : null}
                </div>
                <div className={classes.actions}>
                    <Button onClick={() => setShowForgetPassword(true)}>{__('forget.password')}</Button>
                </div>
                <div className={classes.buttons}>
                    <Button 
                        type={'submit'} 
                        loading={isSubmitting} 
                        priority={'primary'}
                        classes={{button: classes.button}}
                    >
                        <span>{__("sign.in")}</span>
                    </Button>
                    <div className={classes.or}>
                        <span>{__("or")}</span>
                    </div>
                    <div>
                        <SignInFacebook classes={{fbButton: classes.fbButton}} closeModal={closeModal}/>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );

    if (showResetPassword) {
        content = <PasswordReset cognitoUser={cognitoUser} oldPassword={formik.values.password} afterSuccess={handleResetSuccess} />;
    } else if (showConfirmation) {
        content = <SignUpConfirm phoneNumber={formik.values.phoneNumber} setShowConfirmation={setShowConfirmation} setMessage={setMessage} />;
    } else if (showForgetPassword) {
        content = <PasswordForget
            phoneNumber={formik.values.phoneNumber}
            setShowForgetPassword={setShowForgetPassword}
            setShowConfirmation={setShowConfirmation}
            afterSuccess={handleResetPasswordSuccess}
            setMessage={setMessage}
        />;
    }
    return (
        <div className={classes.root}>
            {content}
        </div>
    );
}

export default SignIn;