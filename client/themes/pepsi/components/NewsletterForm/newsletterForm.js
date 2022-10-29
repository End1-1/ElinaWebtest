import React from 'react';
import defaultClasses from './newsletterForm.module.css';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';
import Message from 'Components/Message';
import { mergeClasses } from 'Helper/classify';
import { useNewsletterForm } from 'Talons/NewsletterForm/useNewsletterForm';

const NewsletterForm  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        formik,
        message,
        isSubmitting,
        __
    } = useNewsletterForm();
    
    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <h2>{__("Join Our Newsletter")}</h2>
                <span>{__("Get weekly access to our best deals, tips and tricks.")}</span>
                <div className={classes.field}>
                    <TextInput type="text" 
                        name="email"
                        placeholder={__('Your email address')} 
                        classes={{input: classes.input}} 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email ? (<div className={classes.validationError}>{__(formik.errors.email)}</div>) : null}
                </div>
                <Button loading={isSubmitting} priority="primary" classes={{primary: classes.joinButton}} >{__('JOIN')}</Button>
                {message && <Message containerClass={classes.message} type={message.type}>{__(message.text)}</Message>}
            </form>
        </div>
    );
}

export default NewsletterForm;