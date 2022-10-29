import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classes from './reviewList.module.css';
import { useTranslations } from 'Talons/App/useTranslations';
import { fetchProductReviews } from 'Store/actions/product';
import StarRatings from 'react-star-ratings';

const ReviewList  = props => {
    const { product } = props;
    const { __ } = useTranslations();
    const dispatch = useDispatch();

    const { productReviews: allProductReviews } = useSelector(state => state.product);
    const productReviews = useMemo(() => {
        return allProductReviews && allProductReviews[product.id] ? allProductReviews[product.id] : [];
    }, [allProductReviews, product]);
    
    useEffect(() => {
        dispatch(fetchProductReviews(product.id));
    }, [product]);
    
console.log(productReviews,"productReview")
    return (
        <div className={classes.root}>
            <h3 className={classes.title}>{__('review.list.heading.text')}</h3>
            <div className={classes.list}>
                {!productReviews.length && <p>{__('review.list.empty.text')}</p>}
                {productReviews.map(review => 
                    <div className={classes.review}>
                        <p className={classes.name} >{review.name}</p>
                        <p className={classes.date} >{review.date}</p>
                        <div className={classes.starRating}>
                        <StarRatings
                            rating={review.rating}
                            starRatedColor="#FFB800"
                            starDimension="16px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name='rating'
                            isSelectable={false}
                        />
                        </div>
                        {/*<p className={classes.summary}>{review.summary}</p>*/}
                        <p className={classes.description}>{review.review}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewList;