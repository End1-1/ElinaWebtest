import React, { useState } from 'react';
import defaultClasses from './banner.module.css';
import { useBanner } from 'Talons/Banner/useBanner';
import { number, string } from 'prop-types';
import Placeholder from './placeholder';
import RichContent from 'Components/RichContent';
import Link from 'Components/Link';
import Image from 'Components/Image';
import { mergeClasses } from 'Helper/classify'
import isEmpty from 'lodash/isEmpty';

const Banner = (props) => {
    const { id, imageHeight, imageWidth, additionalModuleClasses, additionalGlobalClasses, mustOverlay, hovered, withName, seeContent = true } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const [hasOverlay, setOverlay] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const talonProps = useBanner({
        id
    });

    const { banner, isFetchingBanner } = talonProps;

    if (isFetchingBanner) {
        return <Placeholder />
    }
    return !isEmpty(banner) ? (
        <div
            onMouseEnter={() => setOverlay(true)}
            onMouseLeave={() => setOverlay(false)}
            className={`${classes.root} ${additionalModuleClasses.map(c => classes[c]).join(' ')} ${additionalGlobalClasses.join(' ')}`}
        >
            {banner.link ?
                <Link to={banner.link} target={banner.linkType == 'newTab' ? '_blank' : ''} classes={{link: classes.link}}>
                    <Image
                        alt={banner.name}
                        src={`${banner.image}`}
                        title={banner.name}
                        type={'image-wysiwyg'}
                        className={classes.image}
                        setLoaded={setLoaded}
                    />
                    {loaded && seeContent && <div className={`${classes.content} ${classes[banner.contentPosition]}`}>
                        <RichContent html={banner.content} />
                    </div>}
                    {hasOverlay && mustOverlay || hovered
                    ?   <div className={classes.overlay}>
                            <div className={classes.overlayField}>
                                <span className={classes.overlayName}>
                                     {withName ?  <RichContent html={banner.content} /> : null}
                                </span>
                            </div>
                        </div>
                    :   null
                    }
                </Link>
                :
            <React.Fragment>
                <Image
                    alt={banner.name}
                    src={`${banner.image}`}
                    title={banner.name}
                    type={'image-wysiwyg'}
                    className={classes.image}
                    setLoaded={setLoaded}
                />
                {loaded && <div className={`${classes.content} ${classes[banner.contentPosition]}`}>
                    <RichContent html={banner.content} />
                </div>}
                {hasOverlay && mustOverlay || hovered
                    ?   <div className={classes.overlay}>
                            <div className={classes.overlayField}>
                            </div>
                        </div>
                    :   null
                }
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