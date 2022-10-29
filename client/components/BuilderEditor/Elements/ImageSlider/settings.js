import React from 'react';
import { useSettings } from '../../../../talons/Builder/Elements/ImageSlider/useSettings';
import classes from './settings.css';
import TextInput from '../../../TextInput';
import Select from 'Components/Select';
import Message from '../../../Message';
import Button from '../../../Button';

const Settings = (props) => {
    const { onDone, onClose, initialValues, handleSubmit, item } = props;
    const { 
        formik,
        isSubmitting,
        message,
        sliderDropdownOptions,
        __
    } = useSettings({
        item,
        handleSubmit
    });

    console.log('formik', formik);

    return (
        <div>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes.field}>
                    <label htmlFor="type">{__('Type')}</label>
                    <Select
                        placeholder={__('Slider')}
                        fluid
                        selection
                        name={'sliderId'} 
                        value={formik.values.sliderId}
                        options={sliderDropdownOptions}
                        onChange={(value) => formik.setFieldValue('sliderId', value)} 
                    />
                    {formik.errors.sliderId && formik.touched.sliderId ? (<div className={classes.validationError}>{formik.errors.sliderId}</div>) : null}
                </div>
            </form>
            {message.type == 'error' &&
                <Message negative>{message.text}</Message>
            }
            {message.type == 'success' &&
                <Message color='green'>{message.text}</Message>
            }
            <Button color='black' onClick={onClose}>
                {__('Cancel')}
            </Button>
            <Button
                content={__('Submit')}
                labelPosition='right'
                icon='checkmark'
                onClick={formik.handleSubmit}
                loading={isSubmitting}
                type={'submit'}
                positive
            >Save</Button>
    </div>
    );
}

export default Settings;