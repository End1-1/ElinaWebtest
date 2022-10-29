import React, { useState, useMemo, useEffect, useCallback } from 'react';

import defaultClasses from './slider.module.css';
import { useSlider } from 'Talons/Slider/useSlider';
import { number } from 'prop-types';
import { CarouselProvider, Slider as PureSlider, Slide, DotGroup, Dot, ButtonBack, ButtonNext } from 'pure-react-carousel';
import Link from 'Components/Link';
import RichContent from 'Components/RichContent';
import Icon from 'Components/Icon';

const Slider = (props) => {
    const { id, imageHeight, imageWidth } = props;
    const [clicked, setClicked] = useState('back');
    const classes = defaultClasses;
    
    const {
        slider, 
        loading, 
        setSlideImageDetails,
        naturalSlideWidth,
        naturalSlideHeight
    } = useSlider({
        id
    });

    if (loading || !slider) {
        return null;
    }
    const buttonClassName = (clicked === 'back' || clicked === 'next') ? classes.buttonFocus : classes.backBtn
    return slider ? (
        <CarouselProvider
            naturalSlideWidth={naturalSlideWidth}
            naturalSlideHeight={naturalSlideHeight}
            totalSlides={slider.slides.length}
            visibleSlides={1}
            className={classes.wrapper}
            interval={5000}
            isPlaying={true}
            touchEnabled={true}
        >
        <PureSlider>
            {slider.slides.map((slide, index) =>
                <div key={index}>
                    <Slide index={index} className={classes.slide} classNameHidden={classes.notVisible} classNameVisible={classes.visible}>
                        <div key={slide.id} className={classes.slide}>
                            {slide.link ? 
                                <Link to={slide.link} target={slide.linkType == 'newTab' ? '_blank' : ''} className={classes.link}>
                                    <Image
                                        alt={slide.title}
                                        src={`${slide.image}`}
                                        title={slide.title}
                                        type={'image-wysiwyg'}
                                        classes={{root: classes.imageContainer, image: classes.image}}
                                        setDetails={(details) => setSlideImageDetails(index, details)}
                                    />
                                    <div className={`${classes.content} ${classes[slide.contentPosition]}`}>
                                        <RichContent html={slide.content} />
                                    </div>
                                </Link> 
                                : 
                            <React.Fragment>
                                <Image
                                    alt={slide.title}
                                    src={`${slide.image}`}
                                    title={slide.title}
                                    type={'image-wysiwyg'}
                                    classes={{root: classes.imageContainer, image: classes.image}}
                                    setDetails={(details) => setSlideImageDetails(index, details)}
                                />
                                <div className={`${classes.content} ${classes[slide.contentPosition]}`}>
                                    <RichContent html={slide.content} />
                                </div>
                            </React.Fragment>}
                        </div>
                    </Slide>
                </div>
            )}
        </PureSlider>
        <div className={classes.buttons}>
            <ButtonBack className={buttonClassName} onClick={() => setClicked('back')}>
                <span className={classes.leftIcon}><Icon name="arrow"/></span>
            </ButtonBack>
            <ButtonNext className={buttonClassName} onClick={() => setClicked('next')}>
                <span className={classes.rightIcon}><Icon name="arrow"/></span>
            </ButtonNext>
        </div>
    </CarouselProvider>
    ) : <div className={`${classes.wrapper} ${loading ? classes.placeholder : ''}`} style={{height: imageHeight, width: imageWidth}}></div>;
}

Slider.propTypes = {
    id: number,
    imageHeight: number,
    imageWidth: number
}

export default Slider;