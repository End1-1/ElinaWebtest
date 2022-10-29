import React from 'react';
import defaultClasses from './reviewForm.module.css';
import Button from 'Components/Button';
import TextArea from 'Components/TextArea';
import Message from 'Components/Message';
import StarRatings from 'react-star-ratings';
import { useReviewForm } from 'Talons/ReviewForm/useReviewForm';
import { mergeClasses } from 'Helper/classify';
import IconMoon from 'Components/IconMoon';
import TextInput from 'Components/TextInput';
import Modal from 'Components/Modal';

const ReviewForm  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        formik,
        isSubmitting,
        message,
        isAllowedToLeaveReview,
        isSignedIn,
        __
    } = useReviewForm(props);

    if (!isAllowedToLeaveReview) return null;
    const { handleToggleDrawer, drawer } = props;

    return (
        <Modal
            open={drawer === "review" && isAllowedToLeaveReview}
            onClose={() => handleToggleDrawer("")}
            classes={{content: classes.root}}
        >
            <div className={classes.body}>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <div className={classes.titleField}>
                        <h3 className={classes.title}>{__('leave.a.comment')}</h3>
                    </div>
                    {
                        !isSignedIn 
                        ?  <div className={classes.flex}>
                                <TextInput type="text" 
                                    name="name"
                                    classes={{input: classes.input}} 
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    label={"Name"} 
                                    hasError={formik.errors.name && formik.touched.name}
                                />
                                <TextInput type="text" 
                                    name="email"
                                    classes={{input: classes.input}} 
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    label={"Email"}
                                    hasError={formik.errors.email && formik.touched.email}
                                />
                            </div>
                        :   null 
                    }
                    <div className={classes.textArea}>
                        <TextArea type="text" 
                            name="review"
                            placeholder={`${__('review')}*`}
                            className={classes.review} 
                            value={formik.values.review}
                            onChange={formik.handleChange}
                            hasError={formik.errors.review && formik.touched.review}
                            classes={{input:classes.input}}
                        />
                        <div className={classes.validationError}>
                            * {__("required")}
                        </div>
                    </div>
                    <div className={classes.rating}>
                        <div className={classes.ratingField}>
                            <StarRatings
                                rating={formik.values.rating}
                                starRatedColor="#00414B"
                                starHoverColor="#00414B"
                                starDimension="27px"
                                starSpacing="9px"
                                changeRating={(newRating) => formik.setFieldValue('rating', newRating)}
                                numberOfStars={5}
                                name='rating'
                            />
                        </div>
                        <div className={classes.ratingTextField}>
                            <span className={classes.ratingText}>{__("please.rate.on.scale")}</span> 
                        </div>
                    </div>
                    <div className={classes.actions}>
                        <Button 
                            type={'submit'} 
                            loading={isSubmitting}
                            classes={{button: classes.button}}
                        >
                            {__("send")}
                        </Button>
                    </div>
                    {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
                </form>
            </div>
        </Modal>

    );
}

export default ReviewForm;