import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classes from './reviewList.module.css';
import { useTranslations } from 'Talons/App/useTranslations';
import { fetchProductReviews } from 'Store/actions/product';
import StarRatings from 'react-star-ratings';
import { convertTimeZone } from 'Helper/convertTimeZone';

const ReviewList  = props => {
    const { product } = props;
    const { __ } = useTranslations();
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState(false)
    const getFormatedDate = (date) => {
        if(!date) {
            return null
        }
        const myDate = new Date(date);
        const temp = convertTimeZone(myDate, "Asia/Yerevan");
        const tempDay = temp.getDate();
        const tempMonth = temp.getMonth() + 1;
        const year = temp.getFullYear();
        console.log(tempDay, year);
        const day = tempDay > 9 ? tempDay : `0${tempDay}`
        const month = tempMonth > 9 ? tempMonth : `0${tempMonth}`;
        return `${day}.${month}.${year}`
    }
    const { productReviews: allProductReviews } = useSelector(state => state.product);
    const productReviews = useMemo(() => {
        return allProductReviews && allProductReviews[product.id] ? allProductReviews[product.id] : [];
    }, [allProductReviews, product]);
    
    useEffect(() => {
        dispatch(fetchProductReviews(product.id));
    }, [product]);

    return (
        <div className={classes.root}>
            <div className={classes.list}>
                {!productReviews.length && <p>{__('review.list.empty.text')}</p>}
               {
                productReviews.map((review, index) => {
                    if(!showMore && index >= 2) {
                        return null;
                    } else {
                        return (
                            <div className={classes.review}>
                                <div>
                                    <StarRatings
                                        rating={review.rating}
                                        starRatedColor="#00414B"
                                        starHoverColor="#00414B"
                                        starDimension="19px"
                                        starSpacing="6px"
                                        numberOfStars={5}
                                        name='rating'
                                        isSelectable={false}
                                    />
                                </div>
                                <p className={classes.nameField}>
                                    <span className={classes.name}>{review.name}</span>
                                    <span className={classes.date}>| {getFormatedDate(review.date)}</span>
                                </p>
                                <p className={classes.reviewText}>{review.review}</p>
                            </div>
                        )
                    } 
                })
                }
            </div>
            {!showMore && productReviews.length > 2 && <div className={classes.footer}>
                <div className={classes.showMoreField} onClick={()=>setShowMore(true)}>
                    <span className={classes.showMore}>{__("view.more")}</span>
                </div>
            </div>}
        </div>
    );
}

export default ReviewList;