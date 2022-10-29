import React, { useEffect, useState } from 'react';
import classes from './productSlider.module.css';
import Loading from 'Components/Loading';
import GalleryItem from 'Components/Gallery/item';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import { useProductSlider } from 'Talons/ProductSlider/useProductSlider';
import { number, string } from 'prop-types';
import Placeholder from 'Components/ProductSlider/placeholder';
import useWindowSize from 'Hooks/useWindowSize';


const ProductSlider = (props) => {
    const { id, type, pageSize, visibleItems, products } = props;
    const { width } = useWindowSize();
    let visibleSlide = visibleItems;

    const talonProps = useProductSlider({
        id,
        type,
        pageSize,
        products
    });

    const { items } = talonProps;
    // if (isFetchingProducts) {
    //     return <Placeholder />;
    // }

    // No items to show, just show nothing
    if (!items.length) {
        return null;
    }

    if(width < 993 && width > 768) {
        visibleSlide = 3;
    }else if(width < 769 && width > 500) {
        visibleSlide = 2;
    }else if(width < 501) {
        visibleSlide = 1;
    }



    return items ? (
        <div className={classes.root}>
            <CarouselProvider 
                naturalSlideWidth={310} 
                naturalSlideHeight={width < 360 ? 640 : width < 745 ? 550 : width < 860 ? 500 : width < 980 ? 450 :400}
                totalSlides={items.length} 
                visibleSlides={visibleSlide}
                infinite={true}
            >
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
                <Slider >
                {items.map((item, index) => 
                    <Slide index={index} key={item.id}>
                        <GalleryItem product={item} />
                    </Slide>
                )}
                </Slider>
            </CarouselProvider>
        </div>
    ) : <Loading />;
}

ProductSlider.propTypes = {
    id: string,
    pageSize: number,
    visibleItems: number
}

ProductSlider.defaultProps = {
    type: 'category',
    products: []
}

export default ProductSlider;