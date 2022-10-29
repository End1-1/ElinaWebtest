import React from 'react';
import defaultClasses from 'Components/ProductContent/productContent.module.css';
import Button from 'Components/Button';
import { useProductContent } from 'Talons/ProductContent/useProductContent';
import ProductQuantity from 'Components/ProductQuantity';
import ProductImageCarousel from 'Components/ProductImageCarousel';
import ProductPrice from 'Components/ProductPrice';
import ProductOptions from 'Components/ProductOptions';
import ProductAttributes from 'Components/ProductAttributes';
import ReviewForm from 'Components/ReviewForm';
import ReviewList from 'Components/ReviewList';
import ReviewSummary from 'Components/ReviewSummary';
import ProductSlider from 'Components/ProductSlider';
import { mergeClasses } from 'Helper/classify';
import ShareButtons from 'Components/ShareButtons';
import Subscribe from '../Subscribe/subscribe';
import Breadcrumbs from 'Components/Breadcrumbs';
import RichContent from 'Components/RichContent';

const ProductContent  = props => {
    const { product, breadcrumbs } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
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
        enableToSubscribeValue
    } = useProductContent({
        product,
        place: 'productPage'
    });

    return (
        <div className={classes.root}>
            <Breadcrumbs crumbs={breadcrumbs} />
            <div className={classes.top}>
                <div className={classes.left}>
                    <div className={classes.carouselWrapper}>
                        <ProductImageCarousel images={variant && variant.product.images ? variant.product.images : product.images} />
                    </div>
                </div>
                <div className={classes.right}>
                    <h1>{product.name}</h1>
                    <ReviewSummary product={product} />
                    <div className={classes.stockStatus}>
                        <span className={quantity > 0 ? classes.inStock : classes.outOfStock}>{quantity > 0 ? __('in.stock.text') : __('out.of.stock.text')}</span>
                    </div>
                    <ProductPrice product={product} variant={variant} place='productPage' />
                    <div className={classes.shortDescription}>
                        <RichContent html={product.shortDescription} />
                    </div>
                    <ProductOptions
                        onSelectionChange={handleSelectionChange}
                        options={allowedOptions}
                        showOptionLabels={true}
                        selectedValues={optionSelections}
                        visibleOptions={true /* All options should be visible */}
                    />
                    <div className={classes.cartActions}>
                        <ProductQuantity initialValue={addQty} maxQuantity={quantity} onValueChange={(qty) => setAddQty(qty)} />
                        <Button loading={isAddingToCart} onClick={() => handleAddToCart(product)}>
                            {__('add.to.cart')}
                        </Button>
                    </div>
                    <p><span className={classes.sku}>SKU: {product.sku}</span></p>
                    <ShareButtons place={'productPage'} />
                    {
                        enableToSubscribeValue == "yes" && (quantity < 1)
                        ?   <Subscribe productId={product.id} variantId={variant ? variant.product.id : false} />
                        :   null
                    }
                </div>
            </div>
            <ProductAttributes product={product} />
            <div className={classes.reviewFormAndList}>
                <ReviewForm product={product} />
                <ReviewList product={product} />
            </div>
            {product.relatedProducts.length > 0 && 
                <div className={classes.relatedProducts}>
                    <h4>{__('related.products')}</h4>
                    <ProductSlider type={'relatedProducts'} products={product.relatedProducts} visibleItems={5} />
                </div>
            }
        </div>
    );
}

export default ProductContent;