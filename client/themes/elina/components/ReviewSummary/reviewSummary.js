import React, { useEffect, useMemo } from 'react';
import classes from './reviewSummary.module.css';
import { useTranslations } from 'Talons/App/useTranslations';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductReviews } from 'Store/actions/product';

const ReviewSummary  = props => {
    const { product, isSignedIn } = props;
    const { __ } = useTranslations();
    const dispatch = useDispatch();
    const { productReviews: allProductReviews } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(fetchProductReviews(product.id));
    }, [product]);
    const productReviews = useMemo(() => {
        return allProductReviews && allProductReviews[product.id] ? allProductReviews[product.id] : [];
    }, [allProductReviews, product]);
    const averageRating = useMemo(() => {
        if(productReviews){
            const rating = productReviews.reduce((state, current) => (state + current.rating), 0)
            return rating / productReviews.length
        }
    }, [productReviews]);

    if(!productReviews.length && !isSignedIn) {
        return null
    }

    return (
        <div className={classes.root}>
            <StarRatings
                rating={averageRating || 4}
                starRatedColor="#2B3944"
                starDimension="19px"
                starSpacing="3px"
                numberOfStars={5}
                name='rating'
                isSelectable={false}
            />
            <div className={classes.summary}>
                {Number(averageRating).toFixed(2)} (5)
            </div>
        </div>
    );
}

export default ReviewSummary;