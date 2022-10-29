import React, {useState} from 'react';
import defaultClasses from './productContent.module.css';
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
import Subscribe from 'Components/Subscribe/subscribe';
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

    const [showTab, setshowTab] = useState('reviews');

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
                    <div className={classes.reviewBlock}>
                        <ReviewSummary product={product} />
                    </div>
                    <h1>{product.name}</h1>
                    <div className={classes.stockStatus}>
                        <span className={quantity > 0 ? classes.inStock : classes.outOfStock}>{quantity > 0 ? __('in.stock.text') : __('out.of.stock.text')}</span>
                    </div>
                    <ProductPrice product={product} variant={variant} place='productPage' />
                    <div className={classes.shortDescription}>
                        <RichContent html={product.shortDescription} />
                    </div>
                    <p><span className={classes.sku}>SKU: {product.sku}</span></p>
                    <div className={classes.optionsBlock}>
                        <ProductOptions
                            onSelectionChange={handleSelectionChange}
                            options={allowedOptions}
                            showOptionLabels={true}
                            selectedValues={optionSelections}
                            visibleOptions={true /* All options should be visible */}
                        />
                    </div>
                    <div className={classes.cartActions}>
                        <ProductQuantity initialValue={addQty} maxQuantity={quantity} onValueChange={(qty) => setAddQty(qty)} />
                        <Button loading={isAddingToCart} onClick={() => handleAddToCart(product)}>
                            {__('add.to.cart')}
                        </Button>
                    </div>
                    <div className={classes.shareBlock}>
                        <span>{__('Share')}</span>
                        <ShareButtons place={'productPage'} />
                    </div>
                    {
                        enableToSubscribeValue == "yes" && (quantity < 1)
                        ?   <Subscribe productId={product.id}/>
                        :   null
                    }
                </div>
            </div>
            <div className={classes.tabs}>
                <div className={classes.titles}>
                    {product.shortDescription ? <span onClick={() => setshowTab('description')} className={showTab == 'description' && classes.active}>{__('Description')}</span> : ''}
                    {product.attributes.length ? <span onClick={() => setshowTab('information')} className={showTab == 'information' && classes.active}>{__('Information')}</span> : ''}
                    <span onClick={() => setshowTab('reviews')} className={showTab == 'reviews' && classes.active}>{__('Reviews')}</span>
                </div>
                {showTab == 'description' && product.shortDescription ?
                    <div>{product.shortDescription}</div>
                    : ''
                }
                {showTab == 'information' &&
                    <div><ProductAttributes product={product}/></div>
                }
                {showTab == 'reviews' &&
                    <div className={classes.reviewFormAndList}>
                        <ReviewList product={product}/>
                        <ReviewForm product={product}/>
                    </div>
                }
            </div>


            {product.relatedProducts.length > 0 &&
                <div className={classes.relatedProducts}>
                    <h4>{__('related.products')}</h4>
                    <ProductSlider type={'relatedProducts'} products={product.relatedProducts} visibleItems={4} />
                </div>
            }
        </div>
    );
}

export default ProductContent;