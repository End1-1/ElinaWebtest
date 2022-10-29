import React from 'react';
import defaultClasses from './myAccount.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import Tabs from './tabs';
import Message from 'Components/Message';
import { useAccountForm } from 'Talons/Account/useAccountForm';
import { mergeClasses } from 'Helper/classify';
import Link from 'Components/Link';
import Icon from 'Components/Icon';

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
            <h3 className={classes.headline}><span>{__('My Account')}</span></h3>
            <div className={classes.container}>
                <Tabs active={'account'} />
                <div className={classes.content}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.fields}>
                            <div className={classes.information}>
                                <h4 className={classes.title}><span className={'bluTitle'}>{__('Account Information')}</span></h4>
                                <div className={classes.field}>
                                    <TextInput type="text"
                                               name="firstName"
                                               placeholder={__('first.name')}
                                               label={__('first.name')}
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
                                               label={__('last.name')}
                                               className={classes.input}
                                               value={formik.values.lastName}
                                               onChange={formik.handleChange}
                                    />
                                    {formik.errors.lastName && formik.touched.lastName ? (<div className={classes.validationError}>{formik.errors.lastName}</div>) : null}
                                </div>
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
                                        label={__('password')}
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
                                        label={__('password.confirm')}
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
                                        label={__('current.password')}
                                        className={classes.input} 
                                        value={formik.values.currentPassword}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.currentPassword ? (<div className={classes.validationError}>{formik.errors.currentPassword}</div>) : null}
                                </div>
                            </div>}
                        </div>
                        <div className={classes.actions}>
                            <Link to={'/account/dashboard'} className={classes.backLink}>
                                <Icon size={'10px'} name='right' />
                                {__('Back To Dashboard')}
                            </Link>
                            <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
                        </div>
                    </form>
                    <Button onClick={handleDeleteAccount} loading={isDeletingAccount}>{__('delete.account')}</Button>
                    {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
                </div>
            </div>
        </div>
    );
}

export default MyAccount;