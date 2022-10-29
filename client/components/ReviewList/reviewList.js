import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classes from 'Components/ReviewList/reviewList.module.css';
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
            <h3>{__('review.list.heading.text')}</h3>
            <div className={classes.list}>
                {!productReviews.length && <p>{__('review.list.empty.text')}</p>}
                {productReviews.map(review => 
                    <div className={classes.review}>
                        <div>
                        <StarRatings
                            rating={review.rating}
                            starRatedColor="#910a2d"
                            starDimension="20px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name='rating'
                            isSelectable={false}
                        />
                        </div>
                        <p className={classes.summary}>{review.summary}</p>
                        <p>{review.review}</p>
                        <p>By <span className={classes.name}>{review.name}</span> on {review.date}</p>
                    </div>    
                )}
            </div>
        </div>
    );
}

export default ReviewList;