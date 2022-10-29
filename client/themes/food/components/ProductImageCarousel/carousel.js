import React, {useState} from 'react';
import {arrayOf, bool, number, shape, string} from 'prop-types';
import classes from './carousel.module.css';
import {ButtonNext, ButtonBack, CarouselProvider, Slide, Slider, Dot} from 'pure-react-carousel';
import Lightbox from 'react-image-lightbox';
import './react-image-lightbox.css';
import getImageUrl from 'Helper/getImageUrl';
import {useSelector} from "react-redux";
import useWindowSize from "Hooks/useWindowSize";
import Image from "Components/Image"
import Icon from "Components/Icon"

const ProductImageCarousel = props => {
    const {images} = props;
    const initialMainImage = images.findIndex(i => i.roles.includes('main')) != -1 ? images.findIndex(i => i.roles.includes('main')) : 0;
    const [photoIndex, setPhotoIndex] = useState(initialMainImage);
    const [isOpen, setIsOpen] = useState(false);
    const {accountId} = useSelector(state => state.shop);
    const {width} = useWindowSize()

    if (width <= 768) {
        return (
            <div className={classes.root}>
                <div className={classes.carouselContainer}>
                    <CarouselProvider
                        naturalSlideWidth={520}
                        naturalSlideHeight={520}
                        totalSlides={images.length}
                        visibleSlides={1}
                        className={classes.imageContainer}
                        currentSlide={photoIndex}
                    >
                        <div className={classes.main}>
                            <Slider>
                                {images.map((item, index) =>
                                    <div key={index}>
                                        <Slide index={index} className={classes.slide}>
                                            <Image src={item.path} width={520} onClick={() => setIsOpen(true)}/>
                                        </Slide>
                                    </div>
                                )}
                            </Slider>
                            <div className={classes.dots}>
                                {images.map((item, index) =>
                                    <Dot index={index} key={index} slide={index} className={classes.dot} onClick={() => setPhotoIndex(index)} />
                                )}
                            </div>
                        </div>
                    </CarouselProvider>
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={getImageUrl({src: images[photoIndex].path, accountId})}
                        nextSrc={getImageUrl({src: images[(photoIndex + 1) % images.length].path, accountId})}
                        prevSrc={getImageUrl({
                            src: images[(photoIndex + images.length - 1) % images.length].path,
                            accountId
                        })}
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
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.carouselContainer}>
                <CarouselProvider
                    naturalSlideWidth={520}
                    naturalSlideHeight={480}
                    totalSlides={images.length}
                    visibleSlides={1}
                    className={classes.imageContainer}
                    currentSlide={photoIndex}
                >
                    <div className={classes.main}>
                        <Slider>
                            {images.map((item, index) =>
                                <div key={index}>
                                    <Slide index={index} className={classes.slide}>
                                        <Image src={item.path} width={520} onClick={() => setIsOpen(true)}/>
                                    </Slide>
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className={`${classes.thumbnailList} ${images.length < 2 && width > 1000 ?classes.thumbnailSmall :''}`}
                    >
                        <CarouselProvider
                            naturalSlideHeight={200}
                            naturalSlideWidth={220}
                            totalSlides={images.length}
                            visibleSlides={images.length >= 2 ? 2 : 1}
                            className={classes.thumbnailContainer}
                            dragEnabled={images.length <= 2 ? false : true}
                            infinite={true}
                        >
                            {images.length > 2 && <ButtonBack className={classes.backThumbnail}><Icon name={'vector'} /></ButtonBack>}
                            <Slider>
                                {images.map((item, index) =>
                                    <div key={index}>
                                        <Slide index={index} className={classes.thumbnail}
                                               onClick={() => setPhotoIndex(index)}>
                                            <div className={classes.imgSlide}>
                                                <Image src={item.path} width={240}/>
                                            </div>
                                        </Slide>
                                    </div>
                                )}
                            </Slider>
                            {images.length > 2 && <ButtonNext className={classes.nextThumbnail}><Icon name={'vector'} /></ButtonNext>}
                        </CarouselProvider>
                    </div>
                </CarouselProvider>
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={getImageUrl({src: images[photoIndex].path, accountId})}
                    nextSrc={getImageUrl({src: images[(photoIndex + 1) % images.length].path, accountId})}
                    prevSrc={getImageUrl({
                        src: images[(photoIndex + images.length - 1) % images.length].path,
                        accountId
                    })}
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
