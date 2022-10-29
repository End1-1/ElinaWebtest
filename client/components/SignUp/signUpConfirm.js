import React, { useState, useCallback } from 'react';
import classes from './signUp.module.css';
import TextInput from '../TextInput';
import Button from '../Button';
import Loading from '../Loading';
import { useSignUpConfirm } from 'Talons/SignUp/useSignUpConfirm';

const SignUpConfirm  = props => {
    const { userId, username, setShowConfirmation, setMessage } = props;
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
        setMessage
    });

    return (
        <div className={classes.root}>
            <h3>{__('sign.in')}</h3>
            <p>{__('Please enter the confirmation code.')}</p>
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
                <Button type={'submit'} loading={isSubmitting}>{__('Submit')}</Button>
            </form>
            <div className={classes.actions}>
                <Button loading={isResendingCode} onClick={handleResendCode}>{(__('Resend Code'))}</Button>
                <Button onClick={() => setShowConfirmation(false)}>{(__('Go Back'))}</Button>
            </div>
        </div>
    );
}

export default SignUpConfirm;