import React from 'react';
import defaultClasses from 'Components/Banner/banner.module.css';
import { useBanner } from 'Talons/Banner/useBanner';
import { number, string } from 'prop-types';
import Placeholder from 'Components/Banner/placeholder';
import RichContent from 'Components/RichContent';
import Link from 'Components/Link';
import Image from 'Components/Image';

const Banner = (props) => {
    const { id, data, imageHeight, imageWidth, additionalModuleClasses, additionalGlobalClasses } = props;
    const classes = defaultClasses;
    
    const talonProps = useBanner({
        id,
        data
    });

    const { banner, isFetchingBanner } = talonProps;

    if (isFetchingBanner) {
        return <Placeholder />
    }
    
    return banner ? (
        <div className={`${classes.root} ${additionalModuleClasses.map(c => classes[c]).join(' ')} ${additionalGlobalClasses.join(' ')}`}>
            {banner.link ? 
                <Link to={banner.link} target={banner.linkType == 'newTab' ? '_blank' : ''} className={classes.link}>
                    <Image
                        alt={banner.name}
                        src={`${banner.image}`}
                        title={banner.name}
                        type={'image-wysiwyg'}
                        classes={{root: classes.imageContainer, image: classes.image}}
                    />
                    <div className={`${classes.content} ${classes[banner.contentPosition]}`}>
                        <RichContent html={banner.content} />
                    </div>
                </Link> 
                : 
            <React.Fragment>
                <Image
                    alt={banner.name}
                    src={`${banner.image}`}
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
    id: string,
    imageHeight: number,
    imageWidth: number
}

Banner.defaultProps = {
    additionalModuleClasses: [],
    additionalGlobalClasses: []
}

export default Banner;