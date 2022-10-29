import React, {useState} from 'react';
import defaultClasses from './productContent.module.css';
import {useProductContent} from 'Talons/ProductContent/useProductContent';
import {mergeClasses} from 'Helper/classify';
import ProductQuantity from 'Components/ProductQuantity';
import ProductPrice from 'Components/ProductPrice';
import ProductOptions from 'Components/ProductOptions';
import RichContent from 'Components/RichContent';
import Button from 'Components/Button';
import ProductImageCarousel from "../ProductImageCarousel";
import useWindowSize from "Hooks/useWindowSize";
import Modal from "Components/Modal";
import ReviewForm from 'Components/ReviewForm';

const ProductContent = props => {
    const {product, breadcrumbs} = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()
    const [openReview, setOpenReview] = useState()

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
        isAddingToCart,
        enableToSubscribeValue
    } = useProductContent({
        product,
        place: 'productPage'
    });

    if (width <= 768) {
        return (
            <div className={classes.root}>
                        <div className={classes.top}>
                            <div className={classes.left}>
                                <ProductImageCarousel images={product.images}/>
                            </div>
                            <div className={classes.right}>
                                <h1 className={classes.name}>{product.name}</h1>
                                <div className={classes.shortDescription}>
                                    <RichContent html={product.shortDescription}/>
                                </div>
                                <div className={classes.skuField}>
                                    <span className={classes.sku}>SKU: {product.sku}</span>
                                </div>
                                <ProductPrice product={product} variant={variant} place='productPage'/>
                                <div className={classes.productOptions}>
                                    <ProductOptions
                                        onSelectionChange={handleSelectionChange}
                                        options={allowedOptions}
                                        showOptionLabels={true}
                                        selectedValues={optionSelections}
                                        visibleOptions={true /* All options should be visible */}
                                    />
                                </div>
                                <div className={classes.cartActions}>
                                    <ProductQuantity initialValue={addQty} maxQuantity={quantity}
                                                     onValueChange={(qty) => setAddQty(qty)}/>
                                    <Button loading={isAddingToCart} onClick={() => handleAddToCart(product)}
                                            classes={{button: classes.button}}>
                                        {__('add.to.cart')}
                                    </Button>
                                </div>
                            </div>
                            <span className={classes.review} onClick={() => setOpenReview(true)}> {__('Leave.a.review')}</span>
                            <Modal open={openReview} onClose={() => setOpenReview(false)}>
                                <ReviewForm product={product} />
                            </Modal>
                        </div>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.background}>
                <div className={classes.content}>
                    <div className={classes.top}>
                        <div className={classes.left}>
                            <ProductImageCarousel images={product.images}/>
                        </div>
                        <div className={classes.right}>
                            <div className={classes.skuField}>
                                <span className={classes.sku}>SKU: {product.sku}</span>
                            </div>
                            <h1 className={classes.name}>{product.name}</h1>
                            <ProductPrice product={product} variant={variant} place='productPage'/>
                            <div className={classes.shortDescription}>
                                <RichContent html={product.shortDescription}/>
                            </div>
                            <div className={classes.productOptions}>
                                <ProductOptions
                                    onSelectionChange={handleSelectionChange}
                                    options={allowedOptions}
                                    showOptionLabels={true}
                                    selectedValues={optionSelections}
                                    visibleOptions={true /* All options should be visible */}
                                />
                            </div>
                            <div className={classes.cartActions}>
                                <ProductQuantity initialValue={addQty} maxQuantity={quantity}
                                                 onValueChange={(qty) => setAddQty(qty)}/>
                                <Button loading={isAddingToCart} onClick={() => handleAddToCart(product)}
                                        classes={{button: classes.button}}>
                                    {__('add.to.cart')}
                                </Button>
                                <span className={classes.review} onClick={() => setOpenReview(true)}> {__('Leave.a.review')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={openReview} onClose={() => setOpenReview(false)}>
                <ReviewForm product={product} />
            </Modal>
        </div>
    );
}

export default ProductContent;