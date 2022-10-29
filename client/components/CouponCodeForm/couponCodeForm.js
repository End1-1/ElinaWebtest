import React from 'react';
import defaultClasses from './couponCodeForm.module.css';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';
import Message from 'Components/Message';
import { mergeClasses } from 'Helper/classify';
import { useCouponCodeForm } from 'Talons/CouponCodeForm/useCouponCodeForm';

const CouponCodeForm = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        cart,
        handleRemoveCouponCode,
        message,
        isSubmitting,
        formik,
        __
    } = useCouponCodeForm();
    
    return (
        <div className={classes.root}>
            {!cart.couponCode && <form className={classes.form} onSubmit={formik.handleSubmit}>
                <h3>{__('coupon.code')}</h3>
                <div className={classes.field}>
                    <TextInput type="text" 
                        name="code"
                        placeholder={__('code')} 
                        className={classes.input} 
                        value={formik.values.code}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.code && formik.touched.code ? (<div className={classes.validationError}>{formik.errors.code}</div>) : null}
                </div>
                <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
                {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
            </form>}
            {cart.couponCode && <div>
                <p className={classes.existingCouponCode}>Applied code {cart.couponCode}</p>
                <Button loading={isSubmitting} onClick={handleRemoveCouponCode}>{__('Remove')}</Button>
            </div>}
        </div>
    );
}

export default CouponCodeForm;