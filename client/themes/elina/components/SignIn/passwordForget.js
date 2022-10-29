import React from 'react';
import classes from './passwordForget.module.css';
import Button from 'Components/Button';
import { usePasswordForget } from 'Talons/SignIn/usePasswordForget';
import PhoneInput from 'react-phone-input-2';
import TextInput from 'Components/TextInput';
// import 'react-phone-input-2/lib/style.css';
import PasswordForgotConfirm from './passwordForgotConfirm';

const PasswordForget  = props => {
    const { 
        phoneNumber, 
        afterSuccess, 
        setShowForgetPassword, 
        setMessage,
        setShowConfirmation
    } = props;
    const {
        formik,
        isSubmitting,
        message,
        __
    } = usePasswordForget({
        phoneNumber,
        afterSuccess
    });
    return (
        <div className={classes.root}>
            {!formik.values.showPasswordForgetConfirm && <form onSubmit={formik.handleSubmit}>
               <div className={classes.field}>
                    <TextInput  
                        type={'text'}
                        name="phoneOrEmail"
                        value={formik.values.phoneOrEmail}
                        onChange={formik.handleChange}
                        label={__("email.or.phone")}
                        classes={{input: classes.input}}
                        placeholder="+374033123456 / elinaelina@gmail.com"
                    />
                    {formik.errors.phoneOrEmail && formik.touched.phoneOrEmail ? (<div className={classes.validationError}>{formik.errors.phoneOrEmail}</div>) : null}
                </div>
                <div className={classes.buttons}>
                    <Button 
                        loading={isSubmitting} 
                        classes={{button: classes.button}}
                        onClick={formik.handleSubmit}
                    >
                        <span>{__("confirm")}</span>
                    </Button>
                    <Button
                        classes={{button: classes.buttonCancel}}
                        onClick={() => setShowForgetPassword(false)}
                    >
                        <span className={classes.cancel}>{__("cancel")}</span>
                    </Button>
                </div>
                
            </form>}
            {formik.values.showPasswordForgetConfirm 
                &&  <PasswordForgotConfirm 
                        username={formik.values.username} 
                        afterSuccess={afterSuccess} 
                        setMessage={setMessage}
                        setShowConfirmation={setShowConfirmation}
                    />
            }
        </div>
    );
}

export default PasswordForget;