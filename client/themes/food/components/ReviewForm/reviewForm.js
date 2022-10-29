import React from 'react';
import defaultClasses from './reviewForm.module.css';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';
import TextArea from 'Components/TextArea';
import Message from 'Components/Message';
import StarRatings from 'react-star-ratings';
import {useReviewForm} from 'Talons/ReviewForm/useReviewForm';
import {mergeClasses} from 'Helper/classify';

const ReviewForm = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        isAllowedToLeaveReview,
        formik,
        isSubmitting,
        message,
        __
    } = useReviewForm(props);

    if (!isAllowedToLeaveReview) return null;

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <h3 className={classes.title}>{__('write.review.button.text')}</h3>
                <div className={classes.inputs}>
                    <div className={classes.inputField}>
                        <p className={classes.topLabel}>{__('name')}</p>
                        <TextInput type="text"
                                   name="name"
                                   classes={{input: classes.input}}
                                   placeholder={__('name')}
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                        />
                        {formik.errors.name && formik.touched.name ? (
                            <div className={classes.validationError}>{formik.errors.name}</div>) : null}
                    </div>
                    <div className={classes.inputField}>
                        <p className={classes.topLabel}>{__('Email')}</p>
                        <TextInput type="text"
                                   name="summary"
                                   placeholder={__('Email')}
                                   classes={{input: classes.input}}
                                   value={formik.values.summary}
                                   onChange={formik.handleChange}
                        />
                        {formik.errors.summary && formik.touched.summary ? (
                            <div className={classes.validationError}>{formik.errors.summary}</div>) : null}
                    </div>
                </div>
                <div className={classes.textField}>
                    <TextArea type="text"
                              name="review"
                              placeholder={__('review')}
                              className={classes.review}
                              value={formik.values.review}
                              onChange={formik.handleChange}
                              classes={{input: classes.textArea}}
                    />
                    {formik.errors.review && formik.touched.review ? (
                        <div className={classes.validationError}>{formik.errors.review}</div>) : null}
                </div>
                <div className={classes.field}>
                    <StarRatings
                        rating={formik.values.rating}
                        starRatedColor="#FFB800"
                        starDimension="23px"
                        starSpacing="5px"
                        changeRating={(newRating) => formik.setFieldValue('rating', newRating)}
                        numberOfStars={5}
                        name='rating'
                    />
                    {formik.errors.rating && formik.touched.rating ? (
                        <div className={classes.validationError}>{formik.errors.rating}</div>) : null}
                </div>
                <div className={classes.buttonField}>
                    <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
                </div>
                {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
            </form>
        </div>
    );
}

export default ReviewForm;