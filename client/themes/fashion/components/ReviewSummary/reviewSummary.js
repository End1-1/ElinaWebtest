import React from 'react';
import classes from './reviewSummary.module.css';
import { useTranslations } from 'Talons/App/useTranslations';
import StarRatings from 'react-star-ratings';

const ReviewSummary  = props => {
    const { product } = props;
    const { __ } = useTranslations();

    if (!product.averageRating && !product.reviewCount) {
        return null;
    }

    return (
        <div className={classes.root}>
            {product.averageRating && <StarRatings
                rating={product.averageRating}
                starRatedColor="#FFC107"
                starDimension="15px"
                starSpacing="3px"
                numberOfStars={5}
                name='rating'
                isSelectable={false}
            />}
            {product.reviewCount && <span className={classes.reviewCount}>{product.reviewCount} Reviews</span>}
        </div>
    );
}

export default ReviewSummary;