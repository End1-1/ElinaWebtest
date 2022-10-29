import React from 'react';
import { useSettings } from '../../../../talons/Builder/Elements/Section/useSettings';
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
        columnsDropdownOptions,
        __
    } = useSettings({
        item,
        handleSubmit
    });

    console.log('formik', formik);

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.field}>
                <label htmlFor="type">{__('Columns')}</label>
                <Select
                    fluid
                    selection
                    name={'columns'} 
                    defaultValue={String(formik.values.columns || 1)}
                    options={columnsDropdownOptions}
                    onChange={(value) => formik.setFieldValue('columns', value)} 
                />
                {formik.errors.columns && formik.touched.columns ? (<div className={classes.validationError}>{formik.errors.columns}</div>) : null}
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