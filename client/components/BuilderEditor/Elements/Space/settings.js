import React from 'react';
import { useSettings } from '../../../../talons/Builder/Elements/Space/useSettings';
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
        __
    } = useSettings({
        item,
        handleSubmit
    });

    return (
        <React.Fragment>
            <Modal.Content>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <div className={classes.field}>
                        <label htmlFor="code">{__('Size')}</label>
                        <TextInput type="text" 
                            icon="user"
                            name="size"
                            placeholder={__('Size')}
                            className={classes.input} 
                            value={formik.values.size}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.size && formik.touched.size ? (<div className={classes.validationError}>{formik.errors.size}</div>) : null}
                    </div>
                </form>
                {message.type == 'error' &&
                    <Message negative>{message.text}</Message>
                }
                {message.type == 'success' &&
                    <Message color='green'>{message.text}</Message>
                }
            </Modal.Content>
            <Modal.Actions>
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
            </Modal.Actions>
        </React.Fragment>
    );
}

export default Settings;