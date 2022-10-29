import React from 'react';
import defaultClasses from './reviewForm.module.css';
import Button from 'Components/Button';
import TextInput from 'Components/TextInput';
import TextArea from 'Components/TextArea';
import Message from 'Components/Message';
import StarRatings from 'react-star-ratings';
import { useReviewForm } from 'Talons/ReviewForm/useReviewForm';
import { mergeClasses } from 'Helper/classify';

const ReviewForm  = props => {
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
                <h3>{__('write.review.button.text')}</h3>
                <div className={classes.field}>
                    <StarRatings
                        rating={formik.values.rating}
                        starRatedColor="#FFC107"
                        starHoverColor="#FFC107"
                        starDimension="20px"
                        starSpacing="5px"
                        changeRating={(newRating) => formik.setFieldValue('rating', newRating)}
                        numberOfStars={5}
                        name='rating'
                    />
                    {formik.errors.rating && formik.touched.rating ? (<div className={classes.validationError}>{formik.errors.rating}</div>) : null}
                </div>
                <div className={classes.field}>
                    <span className={classes.title}>{__('name')}</span>
                    <TextInput type="text" 
                        name="name"
                        placeholder={__('name')} 
                        className={classes.input} 
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && formik.touched.name ? (<div className={classes.validationError}>{formik.errors.name}</div>) : null}
                </div>
                <div className={classes.field}>
                    <span className={classes.title}>{__('summary')}</span>
                    <TextInput type="text" 
                        name="summary"
                        placeholder={__('Summary')} 
                        className={classes.input} 
                        value={formik.values.summary}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.summary && formik.touched.summary ? (<div className={classes.validationError}>{formik.errors.summary}</div>) : null}
                </div>
                <div className={classes.field}>
                    <span className={classes.title}>{__('review')}</span>
                    <TextArea type="text" 
                        name="review"
                        placeholder={__('review')} 
                        className={classes.review} 
                        value={formik.values.review}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.review && formik.touched.review ? (<div className={classes.validationError}>{formik.errors.review}</div>) : null}
                </div>
                <Button type={'submit'} loading={isSubmitting}>{__('submit')}</Button>
                {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
            </form>
        </div>
    );
}

export default ReviewForm;