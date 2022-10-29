import React from 'react';
import defaultClasses from './newsletterForm.module.css';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';
import Message from 'Components/Message';
import { mergeClasses } from 'Helper/classify';
import { useNewsletterForm } from 'Talons/NewsletterForm/useNewsletterForm';
import Icon from 'Components/Icon';


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
                <h3 className={classes.title}>{__('newsletter.subscribe.form.heading')}</h3>
                <div className={classes.content}>
                    <div className={classes.field}>
                        <TextInput type="text"
                            name="email"
                            placeholder={__('email')}
                            className={classes.input}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email ? (<div className={classes.validationError}>{__(formik.errors.email)}</div>) : null}
                    </div>
                    <Button type={'submit'} loading={isSubmitting}>
                        <Icon size={'20px'} name='envelope' />
                    </Button>
                </div>
                {message && <Message containerClass={classes.message} type={message.type}>{__(message.text)}</Message>}
            </form>
        </div>
    );
}

export default NewsletterForm;