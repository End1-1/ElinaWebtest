import React from 'react';
import classes from 'Components/ProductSlider/productSlider.module.css';
import Loading from 'Components/Loading';
import GalleryItem from 'Components/Gallery/item';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import { useProductSlider } from 'Talons/ProductSlider/useProductSlider';
import { number, string } from 'prop-types';
import Placeholder from './placeholder';
import useWindowSize from 'Hooks/useWindowSize';

const ProductSlider = (props) => {
    const { id, type, pageSize, visibleItems, products } = props;
    const { width } = useWindowSize();

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

    return items ? (
        <div className={classes.root}>
            <CarouselProvider 
                naturalSlideWidth={310} 
                naturalSlideHeight={width < 360 ? 640 : width < 745 ? 550 : width < 860 ? 500 : width < 980 ? 450 :400}
                totalSlides={items.length} 
                visibleSlides={visibleItems} 
            >
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