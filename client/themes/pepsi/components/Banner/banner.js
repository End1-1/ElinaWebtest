import React from 'react';
import defaultClasses from './banner.module.css';
import { useBanner } from 'Talons/Banner/useBanner';
import { number } from 'prop-types';
import Placeholder from 'Components/Banner/placeholder';
import RichContent from 'Components/RichContent';
import Link from 'Components/Link';

const Banner = (props) => {
    const { id, imageHeight, imageWidth } = props;
    const classes = defaultClasses;
    
    const talonProps = useBanner({
        id
    });

    const { banner, isFetchingBanner } = talonProps;

    if (isFetchingBanner) {
        return <Placeholder />
    }
    return banner ? (
        <div className={classes.root}>
            {banner.link ? 
                <Link to={banner.link} target={banner.linkType == 'newTab' ? '_blank' : ''} className={classes.link}>
                    <img
                        alt={banner.name}
                        src={`${IMAGE_BASE_URL}banner/${banner.image}`}
                        title={banner.name}
                        type={'image-wysiwyg'}
                        className={classes.image}
                    />
                    <div className={`${classes.content} ${classes[banner.contentPosition]}`}>
                        <RichContent html={banner.content} />
                    </div>
                </Link> 
                : 
            <React.Fragment>
                <img
                    alt={banner.name}
                    src={`${IMAGE_BASE_URL}banner/${banner.image}`}
                    title={banner.name}
                    type={'image-wysiwyg'}
                    className={classes.image}
                />
                <div className={`${classes.content} ${classes[banner.contentPosition]}`}>
                    <RichContent html={banner.content} />
                </div>
            </React.Fragment>}
        </div>
    ) : null;
}

Banner.propTypes = {
    id: number,
    imageHeight: number,
    imageWidth: number
}

export default Banner;