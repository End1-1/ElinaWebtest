import React from 'react';
import classes from './signedInSubscribeForm.module.css';
import Button from 'Components/Button';
import IconMoon from 'Components/IconMoon';
import TextInput from 'Components/TextInput';
import { useTranslations } from 'Talons/App/useTranslations';

const SignedInSubscribeForm = (props) => {
    const { formik, letCustomerSubscriptionViaAnotherEmailOrPhone } = props;
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <TextInput type="text" 
                    name="customer"
                    placeholder={'Email/Phone'}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.input
                    }} 
                    value={formik.values.customer}
                    onChange={letCustomerSubscriptionViaAnotherEmailOrPhone == "yes" ? formik.handleChange : null}
                />
                <Button onClick={formik.handleSubmit} classes={{button: classes.button}}>
                    <div className={classes.iconField}>
                        <IconMoon name="arrow" classes={{icon: classes.icon}}/>
                    </div>
                </Button>
            </form>
            <span className={classes.message}>{__("leave.your.email.or.phone")}</span>
        </div>
    )
}

export default SignedInSubscribeForm;