import React, { useEffect } from 'react';
import defaultClasses from './productContent.module.css';
import Button from 'Components/Button';
import {useProductContent} from 'Talons/ProductContent/useProductContent';
import ProductImageCarousel from 'Components/ProductImageCarousel';
import ProductPrice from 'Components/ProductPrice';
import ProductOptions from 'Components/ProductOptions';
import ReviewForm from 'Components/ReviewForm';
import ReviewList from 'Components/ReviewList';
import ReviewSummary from 'Components/ReviewSummary';
import ProductSlider from 'Components/ProductSlider';
import {mergeClasses} from 'Helper/classify';
import ShareButtons from 'Components/ShareButtons';
import Subscribe from 'Components/Subscribe/subscribe';
import Breadcrumbs from 'Components/Breadcrumbs';
import RichContent from 'Components/RichContent';
import {useHistory} from 'react-router';
import Link from 'Components/Link'
import useWindowSize from "../../../../hooks/useWindowSize";
import { fetchProductChart } from 'Store/actions/product';
import { useDispatch } from 'react-redux';

const ProductContent  = props => {
    const {product, breadcrumbs} = props;
    const history = useHistory();
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()
    const dispatch = useDispatch();

    const {
        handleAddToCart,
        __,
        quantity,
        addQty,
        setAddQty,
        allowedOptions,
        optionSelections,
        handleSelectionChange,
        variant,
        productData,
        isAddingToCart,
        enableToSubscribeValue,
        handleToggleDrawer,
        drawer,
        activeActionField,
        setActiveActionField,
        isAllowedToLeaveReview,
        phoneFieldOpen,
        setPhoneFieldOpen,
        errorMessage
    } = useProductContent({
        product,
        place: 'productPage'
    });

    useEffect(() => {
        dispatch(fetchProductChart(product.id));
    }, [])

    if (width <= 768) {
        return (
            <div className={classes.root}>
                <div className={classes.body}>
                    <div className={classes.top}>
                        <div className={classes.left}>
                            <div className={classes.carouselWrapper}>
                                <div>
                                     <ProductImageCarousel
                                        images={variant && variant.product.images ? variant.product.images : product.images}
                                        classes={{
                                            main: classes.mainCarousel,
                                            imageContainer: classes.imageContainer,
                                            thumbnail: classes.thumbnail,
                                            carousel: classes.carousel,
                                        }}/>
                                </div>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <div className={classes.nameField}>
                                <h1 className={classes.productName}>{product.name}</h1>
                            </div>
                            <div className={classes.skuField}>
                            <span className={classes.sku}>
                                {__("sku")}: {variant && variant.product ? variant.product.sku : product.sku}
                            </span>
                            </div>
                            <div className={classes.priceField}>
                                <ProductPrice
                                    product={product}
                                    variant={variant}
                                    place='productPage'
                                    classes={{
                                        price: classes.price,
                                        discountedOldPrice:classes.oldPriceProduct,
                                    }}
                                />
                            </div>
                            <div className={classes.options}>
                                <ProductOptions
                                    from="productPage"
                                    onSelectionChange={handleSelectionChange}
                                    options={allowedOptions}
                                    variant={variant}
                                    variants={product.variants}
                                    showOptionLabels={true}
                                    selectedValues={optionSelections}
                                    visibleOptions={true /* All options should be visible */}
                                    classes={{
                                        root: classes.colorOptionRoot,
                                        titleField: classes.titleField,
                                    }}
                                />
                            </div>
                            <div className={classes.reviewSummaryField}>
                                <ReviewSummary product={product}/>
                                {
                                    isAllowedToLeaveReview
                                        ? <div className={classes.addReviewField} onClick={() => {
                                            window.scrollTo(0, 0);
                                            handleToggleDrawer('review')
                                        }}>
                                        <span className={classes.addReview}>
                                            {__("leave.a.comment")}
                                        </span>
                                        </div>
                                        : null
                                }
                            </div>
                            {
                                errorMessage
                                ?   <div className={classes.errorMessage}>
                                        {errorMessage}
                                    </div>
                                :   null
                            }
                            <div className={classes.actions}>
                                {
                                    enableToSubscribeValue == "yes" && variant && variant.product.quantity < 1
                                        ? <Subscribe productId={product.id}
                                                     variantId={variant ? variant.product.id : null}/>
                                        : <div className={classes.cartActions}>
                                            <Button
                                                loading={isAddingToCart}
                                                onClick={() => handleAddToCart(product)}
                                                classes={{button: classes.addToCartButton}}
                                            >
                                                {__('add.to.cart')}
                                            </Button>
                                            <a
                                                href="tel: +374 33 111777"
                                                title="+374 33 111777"
                                                className={`${classes.phone} ${phoneFieldOpen ? classes.openedPhoneField : null}`}
                                                onMouseEnter={() => setPhoneFieldOpen(true)}
                                                onMouseLeave={() => setPhoneFieldOpen(false)}
                                            >
                                                {phoneFieldOpen ? "+374 33 111777" : __("call.us")}
                                            </a>
                                        </div>
                                }
                                <div className={classes.shareButtons}>
                                    <ShareButtons
                                        place={'productPage'}
                                        classes={{
                                            shareButton: classes.shareButton,
                                            root: classes.shareButtonsRoot
                                        }}
                                    />
                                </div>
                            </div>
                            {
                                product.shortDescription
                                ?   <div className={classes.tab}>
                                        <div className={classes.shortDescription}>
                                            <div className={classes.shortDescriptionTitleField}>
                                            <span className={classes.actionTitle}>
                                                {__("product.short.description")}
                                            </span>
                                                <div className={classes.line} onClick={() => activeActionField === "shortDescription" ? setActiveActionField("") : setActiveActionField("shortDescription")}>
                                                    <div className={classes.descLine}></div>
                                                    {activeActionField==="shortDescription" && <div className={classes.activeLine}></div>}
                                                </div>
                                            </div>
                                            {activeActionField===("shortDescription") &&<div className={classes.richContent}>
                                                <RichContent html={product.shortDescription}/>
                                            </div>}
                                        </div>
                                    </div>
                                :   null
                            }
                            <div className={classes.tab}>
                                <div className={classes.actionTitleField}
                                    >
                                    <div className={classes.tabTitle}>
                                        <span
                                            className={classes.actionTitle}
                                        >
                                            {__("product.description")}
                                        </span>
                                        <div className={classes.line}  onClick={() => activeActionField === "description" ? setActiveActionField("") : setActiveActionField("description")}>
                                            <div className={classes.descLine}></div>
                                            {activeActionField==="description" && <div className={classes.activeLine}></div>}
                                        </div>
                                    </div>
                                    {activeActionField === "description" &&
                                    <div className={classes.description}>
                                        <RichContent html={product.description}/>
                                    </div>}
                                </div>
                            </div>
                            <div className={classes.tab}>
                                <div className={classes.actionTitleField}
                                   >
                                    <div className={classes.tabTitle}>
                                    <span
                                        className={classes.actionTitle}>
                                        {__("reviews")}
                                    </span>
                                        <div className={classes.line}   onClick={() =>activeActionField==="reviews"?setActiveActionField(""): setActiveActionField("reviews")}>
                                            <div className={classes.descLine}></div>
                                            {activeActionField==="reviews" && <div className={classes.activeLine}></div>}
                                        </div>
                                    </div>
                                    {activeActionField == "reviews" && <ReviewList product={product}/>}
                                </div>
                            </div>
                        </div>
                        {
                            drawer == "review" && isAllowedToLeaveReview
                                ? <ReviewForm product={product} drawer={drawer} handleToggleDrawer={handleToggleDrawer}/>
                                : null
                        }
                    </div>
                    {product.relatedProducts.length > 0 &&
                    <div className={classes.relatedProducts}>
                        <div className={classes.relatedProductsTitleField}>
                            <div className={classes.relatedLeftLine}></div>
                            <h4 className={classes.relatedProductsTitle}>
                                {__('product.realated.products')}
                            </h4>
                            <div className={classes.relatedRightLine}></div>
                        </div>
                        <ProductSlider type={'relatedProducts'} products={product.relatedProducts}
                                       classes={{
                                           thumbnailList: classes.thumbnailList,
                                           buttonPrev:classes.buttonPrev,
                                           buttonNext:classes.buttonNext,
                                           root:classes.slider,

                                       }}
                                       visibleItems={width <= 400 ? 1 : width <= 768 ? 2 : width <= 880 ? 3 : width <= 1080 ? 4 : width <= 1360 ? 5 : 6}/>
                    </div>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.breadcrumbs}>
                <Link to="/" classes={{link: classes.homeLink}}>
                    {__("home")}
                </Link>
                <span className={classes.line}>|</span>
                <Breadcrumbs crumbs={breadcrumbs} classes={{
                    label: classes.breadcrumbsLabel,
                    crumb: classes.crumb,
                    link: classes.crumbLink
                }}/>
            </div>
            <div className={classes.body}>
                <div className={classes.top}>
                    <div className={classes.left}>
                        <div className={classes.carouselWrapper}>
                            <div>
                                <ProductImageCarousel
                                    images={variant && variant.product.images ? variant.product.images : product.images}
                                    classes={{
                                        thumbnailList: classes.thumbnailList,
                                        imageContainer: classes.imageContainer
                                    }}/>
                            </div>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.nameField}>
                            <h1 className={classes.productName}>{product.name}</h1>
                        </div>
                        <div className={classes.skuField}>
                            <span className={classes.sku}>
                                {__("sku")}: {variant && variant.product ? variant.product.sku : product.sku}
                            </span>
                        </div>
                        <div className={classes.priceField}>
                            <ProductPrice
                                product={product} 
                                variant={variant} 
                                place='productPage'
                                classes={{
                                    price: classes.price,
                                    discountedOldPrice:classes.oldPriceProduct,
                                }}
                            />
                        </div>
                        <div className={classes.reviewSummaryField}>
                            <ReviewSummary product={product} />
                            {
                                isAllowedToLeaveReview
                                ?   <div className={classes.addReviewField} onClick={() => { window.scrollTo(0,0); handleToggleDrawer('review') }}>
                                        <span className={classes.addReview}>
                                            {__("leave.a.comment")}
                                        </span>
                                    </div>
                                :   null
                            }
                        </div>
                        <div className={classes.options}>
                            <ProductOptions
                                from="productPage"
                                onSelectionChange={handleSelectionChange}
                                options={allowedOptions}
                                variant={variant}
                                variants={product.variants}
                                showOptionLabels={true}
                                selectedValues={optionSelections}
                                visibleOptions={true /* All options should be visible */}
                                classes={{root: classes.colorOptionRoot}}
                            />                        
                        </div>
                        {
                            errorMessage
                            ?   <div className={classes.errorMessage}>
                                    {errorMessage}
                                </div>
                            :   null
                        }
                        <div className={classes.actions}>
                            {
                                enableToSubscribeValue == "yes" && variant && variant.product.quantity < 1
                                ?   <Subscribe productId={product.id} variantId={variant ? variant.product.id : null}/>
                                :   <div className={classes.cartActions}>
                                        <Button 
                                            loading={isAddingToCart} 
                                            onClick={() => handleAddToCart(product)}
                                            classes={{button: classes.addToCartButton}}
                                        >
                                            {__('add.to.cart')}
                                        </Button>
                                        <a 
                                            href="tel: +374 33 111777" 
                                            title="+374 33 111777" 
                                            className={`${classes.phone} ${phoneFieldOpen ? classes.openedPhoneField : null}`}
                                            onMouseEnter={() => setPhoneFieldOpen(true)}
                                            onMouseLeave={() => setPhoneFieldOpen(false)}
                                        >
                                            {phoneFieldOpen ? "+374 33 111777" : __("call.us")}
                                        </a>
                                    </div>
                            }
                            <div className={classes.shareButtons}>
                                <ShareButtons 
                                    place={'productPage'} 
                                    classes={{
                                        shareButton: classes.shareButton,
                                        root: classes.shareButtonsRoot
                                    }} 
                                />
                            </div>    
                        </div>
                        {
                            product.shortDescription
                            ?   <div> 
                                    <div className={classes.descriptionLine}></div>
                                    <div className={classes.shortDescription}>
                                        <div className={classes.shortDescriptionTitleField}>
                                            <span className={classes.shortDescriptionTitle}>
                                                {__("product.short.description")}
                                            </span>
                                        </div>
                                        <div className={classes.richContent}>
                                            <RichContent html={product.shortDescription}/>
                                        </div>
                                    </div>
                                    <div className={classes.descriptionLine}></div>
                                </div>
                            :   null
                        }
                    </div>
                </div>
                {
                    drawer == "review" && isAllowedToLeaveReview
                    ? <ReviewForm product={product} drawer={drawer} handleToggleDrawer={handleToggleDrawer}/>
                    : null
                }
                <div className={classes.flexActionTitles}>

                    <div className={classes.actionTitleField} onClick={() => setActiveActionField("description")}>
                        <span className={`${classes.actionTitle} ${activeActionField =="description" && classes.activeActionTitle}`}>
                            {__("product.description")}
                        </span>
                    </div>
                    <div className={classes.actionTitleField} onClick={() => setActiveActionField("reviews")}>
                        <span className={`${classes.actionTitle} ${activeActionField =="reviews" && classes.activeActionTitle}`}>
                            {__("reviews")}
                        </span>
                    </div>
                </div>
                <div className={classes.actionFields}>
                    {
                        activeActionField == "reviews"
                            ? <ReviewList product={product}/>
                            : <div className={classes.description}>
                                <RichContent html={product.description}/>
                            </div>
                    }
                </div>
                {product.relatedProducts.length > 0 &&
                <div className={classes.relatedProducts}>
                    <div className={classes.relatedProductsTitleField}>
                        <div className={classes.relatedLeftLine}></div>
                        <h4 className={classes.relatedProductsTitle}>
                            {__('product.realated.products')}
                        </h4>
                        <div className={classes.relatedRightLine}></div>
                    </div>
                    <ProductSlider type={'relatedProducts'} products={product.relatedProducts}
                                   classes={{
                                       thumbnailList: classes.thumbnailList,
                                       buttonPrev:classes.buttonPrev,
                                       buttonNext:classes.buttonNext,
                                       slider: classes.slider
                                   }}
                                   visibleItems={width <= 410 ? 1 : width <= 768 ? 2 : width <= 880 ? 3 : width <= 1080 ? 4 : width <= 1360 ? 5 : 6}/>
                </div>
                }
            </div>
        </div>
    );
}

export default ProductContent;
