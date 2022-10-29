import React, { useRef, useState } from 'react';

import defaultClasses from './slider.module.css';
import { useSlider } from 'Talons/Slider/useSlider';
import { number, string } from 'prop-types';
import { CarouselProvider, Slider as PureSlider, Slide, Dot } from 'pure-react-carousel';
import Link from 'Components/Link';
import RichContent from 'Components/RichContent';
import Image from 'Components/Image';
import { mergeClasses } from "Helper/classify";

const Slider = (props) => {
    const { id, imageHeight, imageWidth, isHomeSlider } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const slderRef = useRef(null);
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

    return slider ? (
        <CarouselProvider
            naturalSlideWidth={isHomeSlider ? 1000 : naturalSlideWidth}
            naturalSlideHeight={isHomeSlider ? 450 : naturalSlideHeight}
            totalSlides={slider.slides.length}
            visibleSlides={1}
            className={classes.wrapper}
            interval={5000}
            isPlaying={true}
            touchEnabled={true}
            ref={slderRef}
        >
        <PureSlider>
        {slider.slides.map((slide, index) =>
            <div key={index}>
                <Slide index={index} className={classes.slide} classNameHidden={classes.notVisible} classNameVisible={classes.visible}>
                    <div key={slide.id} className={classes.slide}>
                        {slide.link ? 
                            <Link to={slide.link} target={slide.linkType == 'newTab' ? '_blank' : ''} className={classes.link}>
                                <Image
                                    alt={slide.name}
                                    src={`${slide.image}`}
                                    title={slide.name}
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
        <div className={isHomeSlider ? classes.dots : classes.dotsOtherPage}>
            {
                slider.slides.map((slide, index) => {
                    if(index === slider.slides.length - 1) {
                        return (
                            <Dot key={index} slide={index} className={classes.dot}>
                                <div className={classes.dotStyleWrapper}>
                                    <div className={classes.dotStyle}/>
                                </div>
                            </Dot>
                        )
                    }
                    else {
                    return (
                        <Dot key={index} slide={index} className={classes.dot}>
                            <div className={classes.dotStyleWrapper}>
                                <div className={classes.dotStyle}/>
                            </div>
                        </Dot>
                    )}
                })
            }
            </div>
    </CarouselProvider>
    ) : <div className={`${classes.wrapper} ${loading ? classes.placeholder : ''}`} style={{height: imageHeight, width: imageWidth}}></div>;
}

Slider.propTypes = {
    id: string,
    imageHeight: number,
    imageWidth: number
}

export default Slider;