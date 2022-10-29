import React, { Fragment, useRef, useState } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import IconMoon from 'Components/IconMoon';
import Image from 'Components/Image';
import defaultCLasses from './carousel.module.css';
import { CarouselProvider, ImageWithZoom, Slide, Slider } from 'pure-react-carousel';
import getImageUrl from 'Helper/getImageUrl';
import Lightbox from 'react-image-lightbox';
import './react-image-lightbox.css';
import { mergeClasses } from "Helper/classify"
import useWindowSize from "../../../../hooks/useWindowSize";
import Carousel from 'react-multi-carousel';
import Button from "../../../../components/Button";
import Video from "../Video";

const responsive = (width) => {
    return {
        desktop: {
            breakpoint: { max: 3000, min: 1640 },
            items: 3,
            partialVisibilityGutter: -5,
        },
        tablet: {
            breakpoint: { max: 1640, min: 768 },
            items: width <= 1100 ? 2 : 3,
            partialVisibilityGutter: width <= 810 ? 50 : width <= 860 ? 40 : width < 1010 ? 60 : width <= 1100 ? 70 : -5
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: width <= 390 ? 2 : 3,
            partialVisibilityGutter: width <= 390 ? 40 : width < 414 ? 5 : width < 440 ? 10 : width <= 490 ? 20 : width <= 515 ? 20 : width < 540 ? 10 : width < 600 ? 15 : width < 710 ? 10 : width < 740 ? 20 : 30
        },
    }
};


const IMAGE_WIDTH = 620;
const IMAGE_HEIGHT = 620;
const IMAGE_SIZES = new Map();
IMAGE_SIZES.set('small', IMAGE_WIDTH);

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
    const initialMainImage = images.findIndex(i => i.roles.includes('main')) != -1 ? images.findIndex(i => i.roles.includes('main')) : 0;
    const [photoIndex, setPhotoIndex] = useState(initialMainImage);
    const [isOpen, setIsOpen] = useState(false);
    const classes = mergeClasses(defaultCLasses, props.classes)
    const { width } = useWindowSize()
    const refThumbnail = useRef(null)

    return (
        <div className={classes.root}>
            <div className={classes.carouselImage}>
                <CarouselProvider
                    naturalSlideWidth={200}
                    naturalSlideHeight={500}
                    totalSlides={images.length}
                    visibleSlides={1}
                    className={classes.imageContainer}
                    hasMasterSpinner={true}
                    currentSlide={photoIndex}
                    infinite={true}
                >
                    <div className={classes.main}>
                        <Slider>
                            {images.map((item, index) =>
                                <div key={index}>
                                    <Slide index={index} className={classes.slide} onChange={() => set}>
                                        {item.mediaType === "video" ? <Video
                                                className={classes.video}
                                                url={item.path}
                                                controls={true}
                                                autoPlay={true}
                                            />
                                            :
                                            <Fragment>
                                                <ImageWithZoom src={getImageUrl({ src: item.path })} width={600}
                                                               onClick={() => setIsOpen(true)}/>
                                                <Image src={item.path} width={600} onClick={() => setIsOpen(true)}/>
                                            </Fragment>
                                        }
                                    </Slide>
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div>
                    </div>
                </CarouselProvider>
            </div>
            <div className={classes.thumbnailField}>
                {images.length > 3 ?
                    <Fragment>
                        {images.length > 3 &&
                        <Button classes={{ button: classes.prev }} onClick={() => refThumbnail.current.previous()}>
                            <IconMoon name="arrow" classes={{ icon: classes.icon }}/>
                        </Button>}
                        <Carousel
                            ssr={true}
                            ref={refThumbnail}
                            keyBoardControl={true}
                            focusOnSelect={false}
                            partialVisible
                            deviceType={"desktop"}
                            arrows={false}
                            showDots={false}
                            draggable={true}
                            infinite={false}
                            sliderClass={'react-multi-carousel-track'}
                            itemClass=""
                            responsive={responsive(width)}
                            swipeable={true}
                        >
                            {images.map((item, index) => <div key={index} className={classes.thumbnail}
                                                              onClick={() => setPhotoIndex(index)}>
                                    {item.mediaType === "video" ?
                                        <Video
                                            className={classes.videoThumbnail}
                                            url={item.path} playsinline
                                            style={{ pointerEvents: "none" }}
                                            autoPlay={true}
                                            loop={true}
                                        /> :
                                        <Image src={item.path} className={classes.thumbnailImage}/>}
                                </div>
                            )}
                        </Carousel>
                        {images.length > 3 && <Button classes={{ button: classes.next }}
                                                      onClick={() => refThumbnail.current.next()}>
                            <IconMoon name="arrow" classes={{ icon: classes.icon }}/>
                        </Button>}
                    </Fragment> : <div className={classes.productList}>
                        {images.map((item, index) => <div key={item.id} className={classes.thumbnail}
                                                          onClick={() => setPhotoIndex(index)}>
                                {item.mediaType === "video" ? <Video
                                        className={classes.videoThumbnail}
                                        url={item.path} playsinline
                                        style={{ pointerEvents: "none" }}
                                        autoPlay={true}
                                        loop={true}
                                    />
                                    : <Image src={item.path} className={classes.thumbnailImage}/>}
                            </div>
                        )}
                    </div>
                }
            </div>
            {isOpen && (
                <div className={classes.lightbox}>
                    <Lightbox
                        wrapperClassName={classes.lightbox}
                        mainSrc={images[photoIndex].mediaType === "image" ? getImageUrl({
                            src: images[photoIndex].path,
                            width: 800
                        }) : ""}
                        nextSrc={images[(photoIndex + 1) % images.length].mediaType === "image" ? getImageUrl({
                            src: images[(photoIndex + 1) % images.length].path,
                            width: 800
                        }) : ""}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length].mediaType === "image" ? getImageUrl({
                            src: images[(photoIndex + images.length - 1) % images.length].path,
                            width: 800
                        }) : ""}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex + images.length - 1) % images.length)
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % images.length)
                        }
                        animationOnKeyInput={true}
                    />
                </div>
            )}
        </div>
    );
};

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
