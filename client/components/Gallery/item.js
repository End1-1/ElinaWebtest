import React from 'react';
import classes from './item.module.css';
import { useItem } from 'Talons/Gallery/useItem';
import { useTranslations } from 'Talons/App/useTranslations';
import Button from '../Button';
import ProductPrice from '../ProductPrice';
import Link from 'Components/Link';
import ProductOptions from '../ProductOptions';
import { useProductContent } from 'Talons/ProductContent/useProductContent';
import ReviewSummary from '../ReviewSummary';
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
            <Link to={link}>
                {product.images && 
                    <div className={classes.productImageWrapper}>
                        <Image className={classes.productImage} width={400} src={imageUrl} />
                    </div>
                }
            </Link>
            <Link className={classes.name} to={link}>{product.name}</Link>
            <ProductPrice product={product} variant={variant} />
            <div className={classes.optionsWrapper}>
                <div className={classes.options}>
                    <ProductOptions 
                        product={product} 
                        options={allowedOptions} 
                        onSelectionChange={handleSelectionChange}
                        visibleOptions={visibleOptions}
                        selectedValues={optionSelections}
                    />
                </div>
            </div>
            {showReviewSummary && <ReviewSummary product={product} />}
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
    );
}

export default Item;