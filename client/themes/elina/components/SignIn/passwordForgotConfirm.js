import React from 'react';
import classes from './passwordForgotConfirm.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import IconMoon from 'Components/IconMoon';
import { usePasswordForgotConfirm } from 'Talons/SignIn/usePasswordForgotConfirm';
import Loading from 'Components/Loading';

const PasswordForgotConfirm  = props => {
    const { 
        userId, 
        username, 
        setShowConfirmation, 
        afterSuccess, 
        setMessage
    } = props;
    const {
        formik,
        handleResendCode,
        isSubmitting,
        isResendingCode,
        showPassword, 
        setShowPassword,
        __
    } = usePasswordForgotConfirm({
        username,
        userId,
        setShowConfirmation,
        setMessage,
        afterSuccess
    });

    if(isResendingCode) {
        return <Loading/>
    }

    return (
        <div className={classes.root}>
            <div className={classes.info}>
                <p className={classes.infoText}>{__("password.code.sent")}</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.field}>
                    <TextInput type="text" 
                        name="confirmationCode"
                        label={__('confirmation.code')}
                        value={formik.values.confirmationCode}
                        onChange={formik.handleChange}
                        classes={{input: classes.input}}
                    />
                    {formik.errors.confirmationCode && formik.touched.confirmationCode 
                        ?   <div className={classes.validationError}>
                                {formik.errors.confirmationCode}</div>
                        :   null
                    }
                </div>
                <div className={classes.field}>
                    <TextInput 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label={__("new.password")}
                        classes={{input: classes.passwordInput}} 
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {showPassword
                        ?   <div className={classes.togglePassword} onClick={() => setShowPassword(false)}>
                                <IconMoon name="hide"/>
                            </div>
                        :   <div className={classes.togglePassword} onClick={() => setShowPassword(true)}>
                                <IconMoon name="show"/>
                            </div>
                    }
                    {formik.errors.password && formik.touched.password 
                        ?   <div className={classes.validationError}>
                                {formik.errors.password}
                            </div>
                        :   null
                    }
                    <div className={classes.resend}>
                        <span className={classes.notReceived}>{__("haven't.received.the.code")}</span>
                        <span className={classes.resendCode} onClick={handleResendCode}>{__("resend.code")}</span>
                    </div>
                </div>
                <div className={classes.buttons}>
                    <Button 
                        loading={isSubmitting}
                        classes={{button: classes.button}}
                        onClick={formik.handleSubmit}
                    >
                        <span>{__("confirm")}</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PasswordForgotConfirm;