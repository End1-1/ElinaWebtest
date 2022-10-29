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
    
    return (
        <div className={classes.root}>
            <h3>{` ${__('reviews')} (${productReviews.length})`}</h3>
            <div className={classes.list}>
                {!productReviews.length && <p>{__('review.list.empty.text')}</p>}
                {productReviews.map(review => 
                    <div className={classes.review}>
                        <div>
                        <StarRatings
                            rating={review.rating}
                            starRatedColor="#FFC107"
                            starDimension="15px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name='rating'
                            isSelectable={false}
                        />
                        </div>
                        <h4><span className={classes.name}>{review.name}</span> {review.date}</h4>
                        <p>{review.review}</p>
                    </div>    
                )}
            </div>
        </div>
    );
}

export default ReviewList;