import React from 'react';
import defaultClasses from 'Components/AddressForm/addressForm.module.css';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';
import Select from 'Components/Select';
import { useAddressForm } from 'Talons/AddressForm/useAddressForm';
import { mergeClasses } from 'Helper/classify';

const AddressForm  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        formik,
        countries,
        countryDropdownOptions,
        type,
        showSaveAsAddress,
        showSetAsDefault,
        isSubmitting,
        __
    } = useAddressForm(props);

    if (!countries || !countries.length) {
        return null;
    }
    
    return (
        <div>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes.fields}>
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
                    <div className={classes.field}>
                        <TextInput type="text" 
                            name="address"
                            placeholder={__('address')} 
                            className={classes.input} 
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.address && formik.touched.address ? (<div className={classes.validationError}>{formik.errors.address}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <TextInput type="text" 
                            name="city"
                            placeholder={__('city')} 
                            className={classes.input} 
                            value={formik.values.city}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.city && formik.touched.city ? (<div className={classes.validationError}>{formik.errors.city}</div>) : null}
                    </div>
                    <div className={`${classes.field} ${classes.country}`}>
                        <Select
                            placeholder={'Select Country'}
                            options={countryDropdownOptions}
                            onChange={(value) => formik.setFieldValue('countryCode', value)}
                            defaultValue={formik.values.countryCode}
                        />
                        {formik.errors.countryCode && formik.touched.countryCode ? (<div className={classes.validationError}>{formik.errors.countryCode}</div>) : null}
                    </div>
                </div>
                {showSetAsDefault && <div className={classes.showIsDefault}>
                    <div>
                        <label htmlFor={`showIsDefault_billing`}>{__('address.form.is.default.billing')}</label>
                        <input id={`showIsDefault_billing`} type={'checkbox'} name={'isDefaultBilling'} onChange={(e) => formik.setFieldValue('isDefaultBilling', e.target.checked, false)} />
                    </div>
                    <div>
                        <label htmlFor={`showIsDefault_shipping`}>{__('address.form.is.default.shipping')}</label>
                        <input id={`showIsDefault_shipping`} type={'checkbox'} name={'isDefaultShipping'} onChange={(e) => formik.setFieldValue('isDefaultShipping', e.target.checked, false)} />
                    </div>
                </div>}
                {showSaveAsAddress && 
                    <div className={classes.saveAsAddress}>
                        <label htmlFor={`saveAsAddress_${type}`}>{__('address.form.save.as.address')}</label>
                        <input id={`saveAsAddress_${type}`} type={'checkbox'} name={'saveAsAddress'} onChange={(e) => formik.setFieldValue('saveAsAddress', e.target.checked, false)} />
                    </div>}
                <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
            </form>
        </div>
    );
}

AddressForm.defaultProps = {
    showSetAsDefault: false
}

export default AddressForm;