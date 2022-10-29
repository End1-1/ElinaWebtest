import React from 'react';
import { useSettings } from '../../../../talons/Builder/Elements/Space/useSettings';
import classes from './settings.css';
import TextInput from '../../../TextInput';
import Select from 'Components/Select';
import Message from '../../../Message';
import Button from '../../../Button';
import TextArea from '../../../TextArea';

const Settings = (props) => {
    const { onDone, onClose, initialValues, handleSubmit, item } = props;
    const { 
        formik,
        isSubmitting,
        message,
        __
    } = useSettings({
        item,
        handleSubmit
    });

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.field}>
                <label htmlFor="code">{__('Content')}</label>
                <TextArea type="text" 
                    icon="user"
                    name="content"
                    placeholder={__('Content')}
                    className={classes.input} 
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />
                {formik.errors.content && formik.touched.content ? (<div className={classes.validationError}>{formik.errors.content}</div>) : null}
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