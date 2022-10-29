import React from 'react';
import classes from './testimonial.module.css';
import StarRatings from 'react-star-ratings';
import Image from 'Components/Image';

const Testimonial = (props) => {
    const { item } = props;

    return (
        <div className={classes.root}>
            <div className={classes.image}>
                <Image src={`${item.authorImage}`} />
            </div>
            <div>
                <div className={classes.rating}>
                    <StarRatings
                        rating={item.rating}
                        starRatedColor="#910a2d"
                        starDimension="20px"
                        starSpacing="3px"
                        numberOfStars={5}
                        name='rating'
                        isSelectable={false}
                    />
                </div>
                <div className={classes.review}>
                    <p>{item.review}</p>
                </div>
                <div className={classes.name}>
                    <h3>{item.firstName}</h3>
                    <h3>{item.lastName}</h3>
                    <img 
                        className={classes.flag} 
                        src={`https://flagcdn.com/16x12/${item.country.toLowerCase()}.png`}
                    />
                </div>
                <div className={classes.role}>
                    <span>{item.role}</span>
                </div>
            </div>
            
        </div>
    )
}

export default Testimonial