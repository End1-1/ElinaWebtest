import React from 'react';
import defaultClasses from './productSlider.module.css';
import Loading from 'Components/Loading';
import GalleryItem from 'Components/Gallery/item';
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import {useProductSlider} from 'Talons/ProductSlider/useProductSlider';
import {number, string} from 'prop-types';
import useWindowSize from 'Hooks/useWindowSize';
import IconMoon from 'Components/IconMoon';
import {mergeClasses} from "../../../../../helper/classify";

const ProductSlider = (props) => {
    const {id, type, pageSize, visibleItems, products} = props;
    const {width} = useWindowSize();
    const classes = mergeClasses(defaultClasses, props.classes)

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
                 naturalSlideHeight={379}
                 totalSlides={items.length}
                 visibleSlides={visibleItems}
                 className={classes.carousel}
                 infinite={true}
                 dragEnabled={items.length <= visibleItems ? false : true}
             >
                 <Slider className={classes.slider}>
                     {items.map((item, index) =>
                         <Slide index={index} key={item.id} className={classes.slide}>
                             <GalleryItem product={item}
                                          classes={{
                                              root: classes.itemRoot,
                                              productImage: classes.productImage,
                                              productImageWrapper: classes.productImageWrapper
                                          }}/>
                         </Slide>
                     )}
                 </Slider>
                 {items.length <= visibleItems ? null : <ButtonBack className={classes.buttonPrev}>
                     <IconMoon name="arrow" size="47px" classes={{icon: classes.icon}}/>
                 </ButtonBack>}

                 {items.length <= visibleItems ? null : <ButtonNext className={classes.buttonNext}>
                     <IconMoon name="arrow" size="47px" classes={{icon: classes.icon}}/>
                 </ButtonNext>}
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