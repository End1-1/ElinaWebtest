import React from 'react';
import classes from './passwordForget.module.css';
import Button from '../Button';
import { usePasswordForget } from 'Talons/SignIn/usePasswordForget';
import PhoneInput from 'react-phone-input-2';
import TextInput from '../TextInput';
// import 'react-phone-input-2/lib/style.css';
import PasswordForgotConfirm from './passwordForgotConfirm';
import Icon from 'Components/Icon';

const PasswordForget  = props => {
    const { phoneNumber, afterSuccess, setShowForgetPassword } = props;
    const {
        formik,
        isSubmitting,
        __
    } = usePasswordForget({
        phoneNumber,
        afterSuccess
    });
    return (
        <div className={classes.root}>
            {!formik.values.showPasswordForgetConfirm && <form onSubmit={formik.handleSubmit}>
                <div className={classes.phoneOrEmail}>
                    <span onClick={() => formik.setFieldValue('phoneOrEmail', 'phone')} className={formik.values.phoneOrEmail == 'phone' ? classes.active : ''}>Phone</span>
                    <span onClick={() => formik.setFieldValue('phoneOrEmail', 'email')} className={formik.values.phoneOrEmail == 'email' ? classes.active : ''}>Email</span>
                </div>
                {formik.values.phoneOrEmail == 'phone' ? <div className={classes.field}>
                    <PhoneInput
                        country={'us'}
                        value={formik.values.phoneNumber}
                        onChange={phone => formik.setFieldValue('phoneNumber', `+${phone}` )}
                        containerClass={classes.phoneFieldContainer}
                        inputClass={classes.phoneFieldInput}
                    />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? (<div className={classes.validationError}>{formik.errors.phoneNumber}</div>) : null}
                </div> : <div className={classes.field}>
                    <TextInput  
                        type={'email'}
                        name="email"
                        placeholder={__('Email')}
                        label={__('Email')}
                        className={classes.input} 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email ? (<div className={classes.validationError}>{formik.errors.email}</div>) : null}
                </div>}
                <Button loading={isSubmitting}>{__('Restore Password')}</Button>
                <span onClick={() => setShowForgetPassword(false)} className={classes.leftIcon}><Icon name='left' /></span>
            </form>}
            {formik.values.showPasswordForgetConfirm && <PasswordForgotConfirm username={formik.values.username} afterSuccess={afterSuccess} />}
        </div>
    );
}

export default PasswordForget;