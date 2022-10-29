import React, { useState } from "react";
import defaultClasses from "./bannerCarousel.module.css";
import Carousel from "react-multi-carousel";
import useWindowSize from "Hooks/useWindowSize";
import "../../../../../../node_modules/react-multi-carousel/lib/styles.css";
import { useSlider } from 'Talons/Slider/useSlider';
import Image from 'Components/Image';
import RichContent from 'Components/RichContent';
import Link from 'Components/Link';

const responsive = (width) => { 
  return {
    desktop: {
      breakpoint: { max: 3000, min: 1640 }
    },
    tablet: {
      breakpoint: { max: 1190, min: 768 },
      items: width <= 1100 ? 3 : 4,
      partialVisibilityGutter: 
      width <= 810 ? 30 : width < 860 ? 25 : width <= 900 ? 40 : width < 960 ? 30 : width < 1010 ? 50 : width <= 1100 ? 70 : 0
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: width <= 390 ? 2 : 3,
      partialVisibilityGutter: width < 335 ? 30 :  width < 350 ? 40 : width <= 365 ? 50 : width <= 390 ? 30 : width < 414 ? 5 : width < 440 ? 10 : width <= 490 ? 20 : width <= 515 ? 20 : width < 540 ? 10 : width < 600 ? 20 : width <= 680 ? 40 : width < 710 ? 10 : width < 740 ? 20 : 30
    },
  }
};

const BannerCarousel = ({ id }) => {
    const {
        slider, 
        loading, 
        setSlideImageDetails,
    } = useSlider({
        id
    });
  const { width } = useWindowSize();

  const renderSliderContent = () => {
    return slider && slider.slides.map((slide, index) =>
      <Link to={slide.link} key={index}>
        <div style={{ position: 'relative' }}>
            <Image
                alt={slide.name}
                src={`${slide.image}`}
                title={slide.name}
                type={'image-wysiwyg'}
                className={defaultClasses.imageContainer}
                setDetails={(details) => setSlideImageDetails(index, details)}
            />
            <div className={`${defaultClasses.content} ${defaultClasses[slide.contentPosition]}`}>
                <RichContent html={slide.content} />
            </div>
        </div>
      </Link>
    );
  };

  if (loading || width === undefined || !slider) {
    return null;
  }

  return (
    <div
      className={defaultClasses.sliderWrapper}
      style={{
        margin: "0 auto",
      }}
    >
      <Carousel
        ssr
        partialVisible
        deviceType={"desktop"}
        arrows={false}
        draggable={true}
        itemClass={defaultClasses.sliderItem}
        responsive={responsive(width)}
      >
        {renderSliderContent()}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;