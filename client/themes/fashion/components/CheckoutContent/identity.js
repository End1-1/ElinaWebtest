import React, { useState, useCallback } from 'react';
import { signUp } from 'Store/actions/auth';
import classes from './identity.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import { useFormik } from 'formik';
import { useIdentity } from 'Talons/Checkout/useIdentity';
import SignUpConfirm from 'Components/SignUp/signUpConfirm';
import PhoneInput from 'Components/PhoneInput';
import Message from 'Components/Message';

  
const Identity  = props => {
    const {
        formik,
        isSubmitting,
        message,
        setMessage,
        phoneOrEmail,
        setPhoneOrEmail,
        userId,
        __
    } = useIdentity({
        ...props
    });

    return (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
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
                
                <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
            </form>
            {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
        </div>
    );
}

export default Identity;