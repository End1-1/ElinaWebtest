import React, { useMemo, useCallback, useState } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import Image from 'Components/Image';
import classes from './carousel.module.css';
import Thumbnail from 'Components/ProductImageCarousel/thumbnail';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, DotGroup, Dot } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import Lightbox from 'react-image-lightbox';
import './react-image-lightbox.css';
import getImageUrl from 'Helper/getImageUrl';
import { useSelector } from "react-redux";

/**
 * Carousel component for product images
 * Carousel - Component that holds number of images
 * where typically one image visible, and other
 * images can be navigated through previous and next buttons
 *
 * @typedef ProductImageCarousel
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns {React.Element} React carousel component that displays a product image
 */
const ProductImageCarousel = props => {
    const { images } = props;
    // This will be the image with role of 'main', otherwise the first image
    const initialMainImage = images.findIndex(i => i.roles.includes('main')) != -1 ? images.findIndex(i => i.roles.includes('main')) : 0;
    const [photoIndex, setPhotoIndex] = useState(initialMainImage);
    const [ isOpen, setIsOpen] = useState(false)
    const { accountId } = useSelector(state => state.shop);

    return (
        <div className={classes.root}>
            <CarouselProvider
                naturalSlideWidth={500}
                naturalSlideHeight={500}
                totalSlides={images.length}
                visibleSlides={1}
                className={classes.imageContainer}
                currentSlide={initialMainImage}
            >
                <div className={classes.main}>
                    <Slider>
                    {images.map((item, index) =>
                        <div key={index}>
                            <Slide index={index} className={classes.slide}>
                                <Image src={item.path} width={800} onClick={() => setIsOpen(true)}/>
                            </Slide>
                        </div>
                    )}
                    
                    </Slider>
                </div>
                <div>

                </div>
                <div className={classes.thumbnailList}>
                    {images.map((item, index) =>
                        <Dot index={index} key={index} slide={index} className={classes.thumbnail} onClick={() => setPhotoIndex(index)}>
                            <Image src={item.path} width={800} />
                        </Dot>
                    )}
                    <ButtonBack className={classes.prev} onClick={() => setPhotoIndex(photoIndex - 1)}></ButtonBack>
                    <ButtonNext className={classes.next} onClick={() => setPhotoIndex(photoIndex + 1)}></ButtonNext>
                </div>
            </CarouselProvider>
            {isOpen && (
                <Lightbox
                    mainSrc={getImageUrl({ src: images[photoIndex].path, accountId })}
                    nextSrc={getImageUrl({ src: images[(photoIndex + 1) % images.length].path, accountId })}
                    prevSrc={getImageUrl({ src: images[(photoIndex + images.length - 1) % images.length].path, accountId })}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                    animationOnKeyInput={true}
                />
            )}
        </div>
    );
};

ProductImageCarousel.defaultProps = {
    images: []
}

/**
 * Props for {@link ProductImageCarousel}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * ProductImageCarousel component
 * @property {string} classes.currentImage classes for visible image
 * @property {string} classes.imageContainer classes for image container
 * @property {string} classes.nextButton classes for next button
 * @property {string} classes.previousButton classes for previous button
 * @property {string} classes.root classes for root container
 * @property {Object[]} images Product images input for Carousel
 * @property {string} images.label label for image
 * @property {string} image.position Position of image in Carousel
 * @property {bool} image.disabled Is image disabled
 * @property {string} image.file filePath of image
 */
ProductImageCarousel.propTypes = {
    classes: shape({
        carouselContainer: string,
        currentImage: string,
        currentImage_placeholder: string,
        imageContainer: string,
        nextButton: string,
        previousButton: string,
        root: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired
        })
    ).isRequired
};

export default ProductImageCarousel;
