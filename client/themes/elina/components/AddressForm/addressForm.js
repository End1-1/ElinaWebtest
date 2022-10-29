import React from 'react';
import defaultClasses from './addressForm.module.css';
import Button from 'Components/Button';
import Select from 'Components/Select';
import { useAddressForm } from 'Talons/AddressForm/useAddressForm';
import { mergeClasses } from 'Helper/classify';
import TextInput from 'Components/TextInput';
import PhoneInput from 'react-phone-input-2';

const AddressForm  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        formik,
        countries,
        countryDropdownOptions,
        stateDropdownOptions,
        districtDropdownOptions,
        cityDropdownOptions,
        type,
        showSaveAsAddress,
        isSubmitting,
        __,
        mode,
        isShowingDistrict
    } = useAddressForm(props);

    if (!countries || !countries.length) {
        return null;
    }

    return (
        <div className={props.type === "checkout" ? classes.rootCheckout : classes.root}>
            {props.type === "checkout" ? null : <h3 className={classes.title}>{mode === "edit" ? __("edit.your.address") : __('add.new.address')}</h3>}
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={props.type === 'checkout' ? classes.checkoutFields : classes.fields}>
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
                    <div className={classes.field}>
                        <PhoneInput
                            country={'am'}
                            value={formik.values.phone}
                            onChange={phone => formik.setFieldValue('phone', `+${phone}` )}
                            containerClass={classes.phoneFieldContainer}
                            inputClass={classes.phoneFieldInput}
                            specialLabel={__('phone')}
                        />
                        {formik.errors.phone && formik.touched.phone ? (<div className={classes.validationError}>{formik.errors.phone}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <Select
                            label={__("country")}
                            options={countryDropdownOptions}
                            onChange={(value) => formik.setFieldValue('countryCode', value)}
                            defaultValue={formik.values.countryCode || " "}
                            classes={{currentLabelField: props.type === "checkout" ? classes.selectBoxCheckout : classes.selectBox, list: classes.selectList, item: classes.selectItem}}
                        />
                        {formik.errors.countryCode && formik.touched.countryCode ? (<div className={classes.validationError}>{formik.errors.countryCode}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <Select
                            label={__("state")}
                            options={stateDropdownOptions}
                            onChange={(value) => formik.setFieldValue('stateCode', value)}
                            defaultValue={formik.values.stateCode || " "}
                            classes={{currentLabelField: props.type === "checkout" ? classes.selectBoxCheckout : classes.selectBox, list: classes.selectList, item: classes.selectItem}}
                        />
                        {formik.errors.stateCode && formik.touched.stateCode ? (<div className={classes.validationError}>{formik.errors.stateCode}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <Select 
                            label={__('city')}
                            options={cityDropdownOptions}
                            classes={{currentLabelField: props.type === "checkout" ? classes.selectBoxCheckout : classes.selectBox, list: classes.selectList, item: classes.selectItem}}
                            value={formik.values.city}
                            onChange={(value) => formik.setFieldValue('city', value)}
                            defaultValue={formik.values.city || " "}
                        />
                        {formik.errors.city && formik.touched.city ? (<div className={classes.validationError}>{formik.errors.city}</div>) : null}
                    </div>
                    {isShowingDistrict && 
                        <div className={classes.field}>
                            <Select
                                label={__("district")}
                                options={districtDropdownOptions}
                                onChange={(value) => formik.setFieldValue('districtCode', value)}
                                defaultValue={formik.values.districtCode || (!props.isBackToShipping && " ")}
                                classes={{currentLabelField: props.type === "checkout" ? classes.selectBoxCheckout : classes.selectBox, list: classes.selectList, item: classes.selectItem}}
                            />
                            {formik.errors.districtCode && formik.touched.districtCode ? (<div className={classes.validationError}>{formik.errors.districtCode}</div>) : null}
                        </div>
                    }
                    <div className={classes.field}>
                        <TextInput type="text" 
                            name="address"
                            classes={{input: classes.input}} 
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            label={__('address')}
                        />
                        {formik.errors.address && formik.touched.address ? (<div className={classes.validationError}>{formik.errors.address}</div>) : null}
                    </div>
                </div>
                {showSaveAsAddress && 
                    <div className={classes.saveAsAddress}>
                        <label htmlFor={`saveAsAddress_${type}`}>{__('address.form.save.as.address')}</label>
                        <input id={`saveAsAddress_${type}`} type={'checkbox'} name={'saveAsAddress'} onChange={(e) => formik.setFieldValue('saveAsAddress', e.target.checked, false)} />
                    </div>
                }
                {type !== "checkout" &&
                    <Button type={'submit'} loading={isSubmitting} classes={{primary: type !== "account" ? classes.checkoutButton : classes.addButton}}>{mode === "edit" ? __('edit') :  __('add')}</Button>
                }
            </form>
        </div>
    );
}

AddressForm.defaultProps = {
}

export default AddressForm;