import React, { Fragment } from 'react';
import Button from 'Components/Button';
import classes from './subscribe.module.css';
import { useSubscribeForm } from 'Talons/ProductContent/useSubscribeForm';
import TextInput from 'Components/TextInput';
import PhoneInput from 'react-phone-input-2';
import IconMoon from 'Components/IconMoon';

const SubscribeForm = (props) => {
    const { formik } = props;
    const talonProps = useSubscribeForm();
    const {
        subscribeViaValue,
        __
    } = talonProps;
    let content = null;

    if (subscribeViaValue == "email") {
        content = <div className={classes.field}>
                    <TextInput type="email" 
                        name="email"
                        placeholder={'Email'}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.input
                        }} 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email ? (<div className={classes.validationError}>{__(formik.errors.email)}</div>) : null}
                </div>;
    } else if (subscribeViaValue == "phone") {
        content = <div className={classes.field}>
                    <PhoneInput
                        country={'us'}
                        value={formik.values.guest}
                        onChange={phone => formik.setFieldValue('guest', `+${phone}`)}
                        containerClass={classes.phoneFieldContainer}
                        inputClass={classes.phoneFieldInput} 
                    />
                    {formik.errors.phone && formik.touched.phone ? (<div className={classes.validationError}>{__(formik.errors.phone)}</div>) : null}
                </div>
    } else if (subscribeViaValue == "emailAndPhone") {
        content = (
                <TextInput type="text" 
                    name="guest"
                    placeholder={'Email/Phone'}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.input
                    }} 
                    value={formik.values.guest}
                    onChange={formik.handleChange}
                />
        )
    }

    return (
        <Fragment>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                {content}
                <Button onClick={formik.handleSubmit} classes={{button: classes.button}}>
                    <div className={classes.iconField}>
                        <IconMoon name="arrow" classes={{icon: classes.icon}}/>
                    </div>
                </Button>
            </form>
            <span className={classes.text}>{__("leave.your.email.or.phone")}</span>
        </Fragment>
    )
}

export default SubscribeForm;