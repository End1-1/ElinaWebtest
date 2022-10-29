import React, { useState, useCallback } from 'react';
import classes from './passwordForgotConfirm.module.css';
import TextInput from '../TextInput';
import Button from '../Button';
import Loading from '../Loading';
import { usePasswordForgotConfirm } from 'Talons/SignIn/usePasswordForgotConfirm';

const PasswordForgotConfirm  = props => {
    const { userId, username, setShowConfirmation, setMessage, afterSuccess } = props;
    const {
        formik,
        handleResendCode,
        isSubmitting,
        isResendingCode,
        __
    } = usePasswordForgotConfirm({
        username,
        userId,
        setShowConfirmation,
        setMessage,
        afterSuccess
    });

    return (
        <div className={classes.root}>
            <p>{__('Please enter the confirmation code and new password.')}</p>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.field}>
                    <TextInput type="text" 
                        name="confirmationCode"
                        placeholder={__('Confirmation Code')}
                        className={classes.input} 
                        value={formik.values.confirmationCode}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirmationCode && formik.touched.confirmationCode ? (<div>{formik.errors.confirmationCode}</div>) : null}
                </div>
                <div className={classes.field}>
                    <TextInput type="password" 
                        name="password"
                        placeholder={__('Password')}
                        className={classes.input} 
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password ? (<div>{formik.errors.password}</div>) : null}
                </div>
                <Button loading={isSubmitting}>{__('Submit')}</Button>
            </form>
            <div className={classes.actions}>
                <Button loading={isResendingCode} onClick={handleResendCode}>{(__('Resend Code'))}</Button>
                <Button onClick={() => setShowConfirmation(false)}>{(__('Go Back'))}</Button>
            </div>
        </div>
    );
}

export default PasswordForgotConfirm;