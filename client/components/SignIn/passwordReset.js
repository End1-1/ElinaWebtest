import React, { useState, useCallback } from 'react';
import classes from './passwordReset.module.css';
import TextInput from '../TextInput';
import Button from '../Button';
import Loading from '../Loading';
import { usePasswordReset } from 'Talons/SignIn/usePasswordReset';

const PasswordReset  = props => {
    const { oldPassword, cognitoUser, afterSuccess } = props;
    const {
        formik,
        isSubmitting,
        __
    } = usePasswordReset({
        oldPassword,
        cognitoUser,
        afterSuccess
    });
    
    return (
        <div className={classes.root}>
            <h3>{__('Reset Password')}</h3>
            <p>{__('You are required to reset your password.')}</p>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.field}>
                    <TextInput type="text" 
                        name="oldPassword"
                        placeholder={__('Old Password')}
                        className={classes.input} 
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.oldPassword && formik.touched.oldPassword ? (<div className={classes.validationError}>{formik.errors.oldPassword}</div>) : null}
                </div>
                <div className={classes.field}>
                    <TextInput type="text" 
                        name="newPassword"
                        placeholder={__('New Password')}
                        className={classes.input} 
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.newPassword && formik.touched.newPassword ? (<div className={classes.validationError}>{formik.errors.newPassword}</div>) : null}
                </div>
                <div className={classes.field}>
                    <TextInput type="text" 
                        name="newPasswordConfirm"
                        placeholder={__('Confirm New Password')}
                        className={classes.input} 
                        value={formik.values.newPasswordConfirm}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.newPasswordConfirm && formik.touched.newPasswordConfirm ? (<div className={classes.validationError}>{formik.errors.newPasswordConfirm}</div>) : null}
                </div>
                <Button loading={isSubmitting}>{__('Confirm')}</Button>
            </form>
        </div>
    );
}

export default PasswordReset;