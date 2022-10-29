import React from 'react';
import defaultClasses from 'Components/MyAccount/myAccount.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import Tabs from 'Components/MyAccount/tabs';
import Message from 'Components/Message';
import {useAccountForm} from 'Talons/Account/useAccountForm';
import {mergeClasses} from 'Helper/classify';
import Breadcrumbs from "Components/Breadcrumbs";

const MyAccount = props => {
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
            <div className={classes.breadcrumbs}>
                <Breadcrumbs
                    classes={{root: classes.breadcrumbsRoot}}
                    crumbs={[
                        {label: 'Home', link: '/'},
                        {label: 'My Account', link: null},
                    ]}/>
            </div>
            <div className={classes.content}>
                <Tabs active={'account'}/>
                <div className={classes.rightContent}>
                    <h3 className={classes.title}>{__('My Account')}</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.nameField}>
                            <div className={classes.field}>
                                <p className={classes.topLabel}>{__('first.name')}</p>
                                <TextInput type="text"
                                           name="firstName"
                                           placeholder={__('first.name')}
                                           classes={{input:classes.input}}
                                           value={formik.values.firstName}
                                           onChange={formik.handleChange}
                                />
                                {formik.errors.firstName && formik.touched.firstName ? (
                                    <div className={classes.validationError}>{formik.errors.firstName}</div>) : null}
                            </div>
                            <div className={classes.field}>
                                <p className={classes.topLabel}>{__('last.name')}</p>
                                <TextInput type="text"
                                           name="lastName"
                                           placeholder={__('last.name')}
                                           classes={{input:classes.input}}
                                           value={formik.values.lastName}
                                           onChange={formik.handleChange}
                                />
                                {formik.errors.lastName && formik.touched.lastName ? (
                                    <div className={classes.validationError}>{formik.errors.lastName}</div>) : null}
                            </div>
                        </div>
                        <div className={classes.field}>
                            <p className={classes.topLabel}>{__('email')}</p>
                            <TextInput type="text"
                                       name="email"
                                       placeholder={__('email')}
                                       classes={{input: classes.input}}
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <div className={classes.validationError}>{formik.errors.email}</div>) : null}
                        </div>
                        <div className={classes.field}>
                            <p className={classes.topLabel}>{__('phone')}</p>
                            <TextInput type="text"
                                       name="phone"
                                       placeholder={__('phone')}
                                       classes={{input: classes.input}}
                                       value={formik.values.phone}
                                       onChange={formik.handleChange}
                            />
                            {formik.errors.phone && formik.touched.phone ? (
                                <div className={classes.validationError}>{formik.errors.phone}</div>) : null}
                        </div>
                        <div>
                            <p className={classes.passwordTitle}>{__('change.password')}</p>
                           <div className={classes.changePassword}>
                               <span className={classes.changePasswordInfo}>You can reset or change your password by clicing here</span>
                               <Button
                                   classes={{button:classes.button}}
                                   onClick={()=>formik.setFieldValue('changePassword', !formik.values.changePassword, false)}
                               >change</Button>
                           </div>
                        </div>
                        {formik.values.changePassword && <div className={classes.passwords}>
                            <div className={classes.field}>
                                <p className={classes.topLabel}>{__('password')}</p>
                                <TextInput type="password"
                                           name="password"
                                           placeholder={__('password')}
                                           classes={{input: classes.input}}
                                           value={formik.values.password}
                                           onChange={formik.handleChange}
                                />
                                {formik.errors.password ? (
                                    <div className={classes.validationError}>{formik.errors.password}</div>) : null}
                            </div>
                            <div className={classes.field}>
                                <p className={classes.topLabel}>{__('password.confirm')}</p>
                                <TextInput type="password"
                                           name="passwordConfirm"
                                           placeholder={__('password.confirm')}
                                           classes={{input: classes.input}}
                                           value={formik.values.passwordConfirm}
                                           onChange={formik.handleChange}
                                />
                                {formik.errors.passwordConfirm ? (<div
                                    className={classes.validationError}>{formik.errors.passwordConfirm}</div>) : null}
                            </div>
                            <div className={classes.field}>
                                <p className={classes.topLabel}>{__('current.password')}</p>
                                <TextInput type="password"
                                           name="currentPassword"
                                           placeholder={__('current.password')}
                                           classes={{input: classes.input}}
                                           value={formik.values.currentPassword}
                                           onChange={formik.handleChange}
                                />
                                {formik.errors.currentPassword ? (<div
                                    className={classes.validationError}>{formik.errors.currentPassword}</div>) : null}
                            </div>
                        </div>}
                        <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
                    </form>
                    {/*<Button onClick={handleDeleteAccount} loading={isDeletingAccount}>{__('delete.account')}</Button>*/}
                    {/*{message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}*/}
                </div>
            </div>
        </div>
    );
}

export default MyAccount;