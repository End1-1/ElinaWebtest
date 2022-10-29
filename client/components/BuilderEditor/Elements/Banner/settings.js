import React from 'react';
import { useSettings } from '../../../../talons/Builder/Elements/Banner/useSettings';
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
        bannerDropdownOptions,
        __
    } = useSettings({
        item,
        handleSubmit
    });

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.field}>
                <label htmlFor="type">{__('Type')}</label>
                <Select
                    placeholder={__('Banner')}
                    fluid
                    selection
                    name={'bannerId'} 
                    value={formik.values.bannerId}
                    options={bannerDropdownOptions}
                    onChange={(value) => formik.setFieldValue('bannerId', value)} 
                />
                {formik.errors.bannerId && formik.touched.bannerId ? (<div className={classes.validationError}>{formik.errors.bannerId}</div>) : null}
            </div>
        
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
    </form>
    );
}

export default Settings;