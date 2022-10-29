import React from 'react';
import classes from './item.module.css';
import { useItem } from 'Talons/Gallery/useItem';
import { useTranslations } from 'Talons/App/useTranslations';
import Button from 'Components/Button';
import ProductPrice from 'Components/ProductPrice';
import Link from 'Components/Link';
import ProductOptions from 'Components/ProductOptions';
import { useProductContent } from 'Talons/ProductContent/useProductContent';
import ReviewSummary from 'Components/ReviewSummary';
import Image from 'Components/Image';

const Item  = props => {
    const { product, placementInfo } = props;

    const { 
        allowedOptions,
        optionSelections,
        handleSelectionChange,
        handleAddToCart,
        variant
    } = useProductContent({
        product
    });

    const {
        link,
        isAddingToCart,
        visibleOptions,
        showOptionsPartially,
        setShowOptionsPartially,
        imageUrl,
        showReviewSummary
    } = useItem({
        product,
        variant,
        placementInfo
    });

    const { __ } = useTranslations();
    
    return (
        <div className={classes.root}>
            <div className={classes.imageWrapper}>
                <Link to={link}>
                    {product.images &&
                        <div className={classes.productImageWrapper}>
                            {imageUrl && <Image className={classes.productImage} width={400} src={imageUrl} />}
                        </div>
                    }
                </Link>
                <div className={classes.mobileVersion}>
                    <div className={classes.actions}>
                        {(!showOptionsPartially || !allowedOptions.length || allowedOptions.length == visibleOptions.length) &&
                        <Button loading={isAddingToCart} onClick={() => handleAddToCart(product)}>
                            <span className={classes.buttonLabel}>{__('add.to.cart')}</span>
                        </Button>
                        }
                        {showOptionsPartially && !!allowedOptions.length && allowedOptions.length != visibleOptions.length &&
                        <Button onClick={() => setShowOptionsPartially(false)}>
                            <span className={classes.buttonLabel}>{__('show.all.options.text')}</span>
                        </Button>
                        }
                    </div>
                </div>
                <div className={classes.optionsWrapper}>
                    <div className={classes.options}>
                        <ProductOptions
                            product={product}
                            options={allowedOptions}
                            onSelectionChange={handleSelectionChange}
                            visibleOptions={visibleOptions}
                            selectedValues={optionSelections}
                            classes={{root: classes.optionRoot}}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.productDetails}>
                <div className={classes.details}>
                    <Link className={classes.name} to={link}>{product.name}</Link>
                    <div className={classes.priceBlock}>
                        <ProductPrice product={product} variant={variant} />
                        {showReviewSummary && <ReviewSummary product={product} />}
                    </div>
                </div>
                <div className={classes.actions}>
                    {(!showOptionsPartially || !allowedOptions.length || allowedOptions.length == visibleOptions.length) &&
                    <Button loading={isAddingToCart} onClick={() => handleAddToCart(product)}>
                        <span className={classes.buttonLabel}>{__('add.to.cart')}</span>
                    </Button>
                    }
                    {showOptionsPartially && !!allowedOptions.length && allowedOptions.length != visibleOptions.length &&
                    <Button onClick={() => setShowOptionsPartially(false)}>
                        <span className={classes.buttonLabel}>{__('show.all.options.text')}</span>
                    </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Item;