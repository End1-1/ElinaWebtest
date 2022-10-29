import React, { useState } from 'react';
import classes from './signUp.module.css';
import TextInput from 'Components/TextInput';
import Button from 'Components/Button';
import { useSignUp } from 'Talons/SignUp/useSignUp';
import SignUpConfirm from 'Components/SignUp/signUpConfirm';
import SignInFacebook from "Components/SignInFacebook"
import IconMoon from 'Components/IconMoon';
// import 'react-phone-input-2/lib/style.css';
import CheckBox from 'Components/CheckBox';

const SignUp  = props => {
    const { showSignInSignUp, closeModal } = props;
    const {
        formik,
        showConfirmation,
        setShowConfirmation,
        isSubmitting,
        message,
        setMessage,
        phoneOrEmail,
        setPhoneOrEmail,
        userId,
        showPassword, 
        setShowPassword,
        __
    } = useSignUp();
    const [checked, setChecked] = useState(false);

    return (
        <div className={classes.root}>
            {showConfirmation ? 
                <SignUpConfirm 
                    userId={userId}
                    username={formik.values.phoneOrEmail} 
                    setShowConfirmation={setShowConfirmation} 
                    setMessage={setMessage}
                    showSignInSignUp={showSignInSignUp}
                    message={message}
                /> 
            : 
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    {
                        message 
                        ?   <div className={message.type =="success" ? classes.successField :  classes.errorField}>
                                <span>
                                    {message.text}
                                </span>
                            </div>
                        :   null
                    }
                    <div className={classes.firstLastNames}>
                        <div className={classes.firstLastField}>
                            <TextInput type="text"
                                icon="key"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                label={__('first.name')}
                                classes={{input: classes.input}}
                            />
                            {formik.errors.firstName && formik.touched.firstName ? (<div className={classes.validationError}>{__(formik.errors.firstName)}</div>) : null}
                        </div>
                        <div className={classes.firstLastField}>
                            <TextInput 
                                type="text"
                                icon="key"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                label={__('last.name')}
                                classes={{input: classes.input}}
                            />
                            {formik.errors.lastName && formik.touched.lastName ? (<div className={classes.validationError}>{__(formik.errors.lastName)}</div>) : null}
                        </div>
                    </div>
                    <div className={classes.field}>
                        <TextInput
                            type={'text'}
                            name="phoneOrEmail"
                            placeholder={"+37433123456 / elinaelina@gmail.com"}
                            value={formik.values.phoneOrEmail}
                            onChange={formik.handleChange}
                            label={__("email.or.phone")}
                            classes={{input: classes.input}}
                        />
                        {formik.errors.phoneOrEmail && formik.touched.phoneOrEmail ? (<div className={classes.validationError}>{__(formik.errors.phoneOrEmail)}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <TextInput 
                            type={showPassword ? "text" : "password"}
                            icon="key"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            label={__('password')}
                            classes={{input: classes.input}}
                        />
                        {showPassword
                        ?   <div className={classes.togglePassword} onClick={() => setShowPassword(false)}>
                                <IconMoon name="hide"/>
                            </div>
                        :   <div className={classes.togglePassword} onClick={() => setShowPassword(true)}>
                                <IconMoon name="show"/>
                            </div>
                        }
                        {formik.errors.password && formik.touched.password ? (<div className={classes.validationError}>{__(formik.errors.password)}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <TextInput 
                            type={showPassword ? "text" : "password"}
                            icon="key"
                            name="passwordConfirm"
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            label={__('password.confirm')}
                            classes={{input: classes.confirmInput}}
                        />
                        {showPassword
                        ?   <div className={classes.togglePassword} onClick={() => setShowPassword(false)}>
                                <IconMoon name="hide"/>
                            </div>
                        :   <div className={classes.togglePassword} onClick={() => setShowPassword(true)}>
                                <IconMoon name="show"/>
                            </div>
                        }
                        {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (<div className={classes.validationError}>{__(formik.errors.passwordConfirm)}</div>) : null}
                    </div>
                    <div className={classes.accept}>
                        <CheckBox
                            label={__("agree.terms.conditions")}
                            value={formik.values.privacy}
                            onChange={() => formik.setFieldValue('privacy', !formik.values.privacy)}
                            isSignUp={true}
                        />
                        {formik.errors.privacy && formik.touched.privacy ? (<div className={classes.validationErrorPrivacy}>{__(formik.errors.privacy)}</div>) : null}
                    </div>
                    <div className={classes.buttons}>
                        <Button 
                            loading={isSubmitting} 
                            classes={{button: classes.button}}
                            onClick={formik.handleSubmit}
                        >
                            <span>{__("sign.up")}</span>
                        </Button>
                        <div className={classes.or}>
                            <span>{__("or")}</span>
                        </div>
                        <div>
                            <SignInFacebook classes={{fbButton: classes.fbButton}} closeModal={closeModal}/>
                        </div>
                    </div>
                </form>
            }
        </div>
    );
}

export default SignUp;