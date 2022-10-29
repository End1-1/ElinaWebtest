import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import React from 'react';
import { useTestimonials } from 'Talons/Testimonials/useTestimonials';
import Testimonial from './testimonial';
import classes from './testimonialSlider.module.css';

const TesimonialSlider = (props) => {
    const { visibleItems } = props;
    const { testimonials, isModuleEnabled } = useTestimonials();

    if (!isModuleEnabled) return null;
    
    return (
        <div className={classes.root}>
            <CarouselProvider 
                naturalSlideWidth={600} 
                naturalSlideHeight={250}
                totalSlides={testimonials.length} 
                visibleSlides={visibleItems}
                infinite={true}
            >
                <Slider >
                {testimonials.map((item, index) =>
                    <Slide index={index} key={item.id}>
                       <Testimonial item={item}/>
                    </Slide>
                )}
                </Slider>
            </CarouselProvider>
        </div>
    )
}

TesimonialSlider.defaultProps = {
    visibleItems: 2
}

export default TesimonialSlider;