import React  from 'react';
import classes from './signUp.module.css';
import TextInput from '../TextInput';
import Link from 'Components/Link';
import Button from '../Button';
import { useSignUp } from 'Talons/SignUp/useSignUp';
import SignUpConfirm from '../SignUp/signUpConfirm';
import PhoneInput from 'Components/PhoneInput';
import Message from '../Message';
  
const SignUp  = props => {
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
        __
    } = useSignUp();

    return (
        <div className={classes.root}>
            <h2>{__('sign.up')}</h2>
            <p>{__('sign.up.text')}</p>
            {showConfirmation ? 
                <SignUpConfirm 
                    userId={userId}
                    username={formik.values.phoneOrEmail == 'email' ? formik.values.email : 'phone'} 
                    setShowConfirmation={setShowConfirmation} 
                    setMessage={setMessage} 
                /> 
            : 
                <form onSubmit={formik.handleSubmit}>
                    <div className={classes.field}>
                        <TextInput type="text" 
                            icon="key"
                            name="firstName"
                            placeholder={__('first.name')}
                            className={classes.input} 
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.firstName && formik.touched.firstName ? (<div className={classes.validationError}>{__(formik.errors.firstName)}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <TextInput type="text" 
                            icon="key"
                            name="lastName"
                            placeholder={__('last.name')}
                            className={classes.input} 
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.lastName && formik.touched.lastName ? (<div className={classes.validationError}>{__(formik.errors.lastName)}</div>) : null}
                    </div>
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
                        {formik.errors.phoneNumber && formik.touched.phoneNumber ? (<div className={classes.validationError}>{__(formik.errors.phoneNumber)}</div>) : null}
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
                        {formik.errors.email && formik.touched.email ? (<div className={classes.validationError}>{__(formik.errors.email)}</div>) : null}
                    </div>}
                    <div className={classes.field}>
                        <TextInput type="password" 
                            icon="key"
                            name="password"
                            placeholder={__('password')}
                            className={classes.input} 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password ? (<div className={classes.validationError}>{__(formik.errors.password)}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <TextInput type="password" 
                            icon="key"
                            name="passwordConfirm"
                            placeholder={__('password.confirm')}
                            className={classes.input} 
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (<div className={classes.validationError}>{__(formik.errors.passwordConfirm)}</div>) : null}
                    </div>
                    <Button loading={isSubmitting} onClick={formik.handleSubmit}>{__('submit')}</Button>
                    <div className={classes.actions}>
                        <div className={classes.signIn}>
                            <Link to={'/signIn'}><Button color={'teal'}>{__('already.have.account')}</Button></Link>
                        </div>
                    </div>
                </form>
            }
            {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
        </div>
    );
}

export default SignUp;