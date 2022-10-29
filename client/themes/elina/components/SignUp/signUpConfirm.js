import React from 'react';
import classes from './signUp.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import { useSignUpConfirm } from 'Talons/SignUp/useSignUpConfirm';
import Loading from 'Components/Loading';

const SignUpConfirm  = props => {
    const { userId, username, setShowConfirmation, setMessage, showSignInSignUp, message } = props;
    const {
        formik,
        handleResendCode,
        isSubmitting,
        isResendingCode,
        __
    } = useSignUpConfirm({
        username,
        userId,
        setShowConfirmation,
        setMessage,
        showSignInSignUp
    });

    if(isResendingCode) {
        return <Loading />
    }

    return (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
                {
                    message 
                    ?   <div className={message.type =="success" ? classes.successFieldConfirm :  classes.errorFieldConfirm}>
                            <span>
                                {message.text}
                            </span>
                        </div>
                    :   null
                }
                <div className={classes.field}>
                    <TextInput type="text" 
                        name="confirmationCode"
                        label={__('confirmation.code')}
                        value={formik.values.confirmationCode}
                        onChange={formik.handleChange}
                        classes={{input: classes.input}}
                    />
                    {formik.errors.confirmationCode && formik.touched.confirmationCode ? (<div>{formik.errors.confirmationCode}</div>) : null}
                </div>
                <div className={classes.titleField}>
                    <p>*{__("password.code.sent")}</p>
                </div>
                <div className={classes.resend}>
                    <span className={classes.notReceived}>{__("haven't.received.the.code")}</span>
                    <span className={classes.resendCode} onClick={handleResendCode}>{__("resend.code")}</span>
                </div>
                <div className={classes.buttons}>
                    <Button 
                        type={'submit'} 
                        loading={isSubmitting}
                        classes={{button: classes.button}}
                    >
                        <span>{__("confirm")}</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignUpConfirm;