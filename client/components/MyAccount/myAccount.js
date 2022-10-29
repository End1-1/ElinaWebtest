import React from 'react';
import defaultClasses from 'Components/MyAccount/myAccount.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import Tabs from 'Components/MyAccount/tabs';
import Message from 'Components/Message';
import { useAccountForm } from 'Talons/Account/useAccountForm';
import { mergeClasses } from 'Helper/classify';

const MyAccount  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        formik,
        handleDeleteAccount,
        isDeletingAccount,
        isSubmitting,
        message,
        __
    } = useAccountForm(props);

    return (
        <div className={classes.root}>
            <Tabs active={'account'} />
            <div className={classes.content}>
                <h3>{__('My Account')}</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className={classes.field}>
                        <TextInput type="text" 
                            name="firstName"
                            placeholder={__('first.name')} 
                            className={classes.input} 
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.firstName && formik.touched.firstName ? (<div className={classes.validationError}>{formik.errors.firstName}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <TextInput type="text" 
                            name="lastName"
                            placeholder={__('last.name')} 
                            className={classes.input} 
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.lastName && formik.touched.lastName ? (<div className={classes.validationError}>{formik.errors.lastName}</div>) : null}
                    </div>
                    <div>
                        <input type={'checkbox'} id={`changePassword`} checked={formik.values.changePassword} onChange={(e) => formik.setFieldValue('changePassword', !formik.values.changePassword, false)} />
                        <label htmlFor={`changePassword`}>{__('change.password')}</label>
                    </div>
                    {formik.values.changePassword && <div className={classes.passwords}>
                        <div className={classes.field}>
                            <TextInput type="password" 
                                name="password"
                                placeholder={__('password')}
                                className={classes.input} 
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password ? (<div className={classes.validationError}>{formik.errors.password}</div>) : null}
                        </div>
                        <div className={classes.field}>
                            <TextInput type="password" 
                                name="passwordConfirm"
                                placeholder={__('password.confirm')}
                                className={classes.input} 
                                value={formik.values.passwordConfirm}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.passwordConfirm ? (<div className={classes.validationError}>{formik.errors.passwordConfirm}</div>) : null}
                        </div>
                        <div className={classes.field}>
                            <TextInput type="password" 
                                name="currentPassword"
                                placeholder={__('current.password')}
                                className={classes.input} 
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.currentPassword ? (<div className={classes.validationError}>{formik.errors.currentPassword}</div>) : null}
                        </div>
                    </div>}
                    <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
                </form>
                <Button onClick={handleDeleteAccount} loading={isDeletingAccount}>{__('delete.account')}</Button>
                {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
            </div>
        </div>
    );
}

export default MyAccount;