import React from 'react';
import defaultClasses from './myAccount.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import Tabs from './tabs';
import { useAccountForm } from 'Talons/Account/useAccountForm';
import { mergeClasses } from 'Helper/classify';
import useWindowWidth from '../../../../hooks/useWindowSize'

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
   const {width} = useWindowWidth()
    return (
        <div className={classes.root}>
            {width > 768 && <Tabs active={'account'} classes={{root:classes.tabsRoot}}/>}
            <div className={classes.content}>
                <h3 className={classes.title}>{__("personal.information")}</h3>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <div className={classes.field}>
                        <TextInput type="text" 
                            name="firstName"
                            classes={{input: classes.input}} 
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            label={__('first.name')} 
                        />
                        {formik.errors.firstName && formik.touched.firstName ? (<div className={classes.validationError}>{formik.errors.firstName}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <TextInput type="text" 
                            name="lastName"
                            classes={{input: classes.input}}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            label={__('last.name')}
                        />
                        {formik.errors.lastName && formik.touched.lastName ? (<div className={classes.validationError}>{formik.errors.lastName}</div>) : null}
                    </div>
                    {
                        formik.values.email
                        ?   <div className={classes.field}>
                                <TextInput type="text" 
                                    name="email"
                                    classes={{input: classes.input}}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    label={__('email')}
                                    disabled={true}
                                />
                                {formik.errors.email && formik.touched.email ? (<div className={classes.validationError}>{formik.errors.email}</div>) : null}
                            </div>
                        :   <div className={classes.field}>
                                <TextInput type="text" 
                                    name="phone"
                                    classes={{input: classes.input}}
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    label={__('phone')}
                                    disabled={true}
                                />
                                {formik.errors.phone && formik.touched.phone ? (<div className={classes.validationError}>{formik.errors.phone}</div>) : null}
                            </div>
                    }
                    <div className={classes.changePasswordPhone}>
                        <span className={classes.changePassword} onClick={() => formik.setFieldValue('changePassword', !formik.values.changePassword, false)}>{__('change.password')}</span>
                    </div>
                    {formik.values.changePassword && <div className={classes.passwords}>
                        <div className={classes.field}>
                            <TextInput type="password" 
                                name="currentPassword"
                                classes={{input: classes.passwordInput}} 
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                label={__("current.password")}
                            />
                            {formik.errors.currentPassword ? (<div className={classes.validationError}>{formik.errors.currentPassword}</div>) : null}
                        </div>
                        <div className={classes.field}>
                            <TextInput type="password" 
                                name="password"
                                classes={{input: classes.passwordInput}} 
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                label={__("new.password")}
                            />
                            {formik.errors.password ? (<div className={classes.validationError}>{formik.errors.password}</div>) : null}
                        </div>
                        <div className={classes.field}>
                            <TextInput type="password" 
                                name="passwordConfirm"
                                classes={{input: classes.confirmPasswordInput}} 
                                value={formik.values.passwordConfirm}
                                onChange={formik.handleChange}
                                label={__('password.confirm')}
                            />
                            {formik.errors.passwordConfirm ? (<div className={classes.validationError}>{formik.errors.passwordConfirm}</div>) : null}
                        </div>
                    </div>}
                    <div>
                        {
                            message 
                            ?   <div className={`${message.type == "succes" ? classes.message : classes.errorMessage}`}>
                                    {message.text}
                                </div>
                            :   null
                        }
                        <Button 
                            type={'submit'} 
                            loading={isSubmitting}
                            classes={{button: classes.submitButton}}
                        >
                            {__("save")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MyAccount;