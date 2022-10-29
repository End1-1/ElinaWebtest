import React from 'react';
import defaultClasses from './item.module.css';
import {useItem} from 'Talons/Gallery/useItem';
import {useTranslations} from 'Talons/App/useTranslations';
import ProductPrice from 'Components/ProductPrice';
import Link from 'Components/Link';
import ProductOptions from 'Components/ProductOptions';
import {useProductContent} from 'Talons/ProductContent/useProductContent';
import Image from 'Components/Image';
import {mergeClasses} from 'Helper/classify';
import Button from 'Components/Button';
import { useHistory } from 'react-router';

const Item = props => {
    const {product, addToCartEnabled, largeItems } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const history = useHistory()
    const { 
        allowedOptions,
        optionSelections,
        handleSelectionChange,
        handleAddToCart,
        variant,
        phoneFieldOpen,
        setPhoneFieldOpen,
        isAddingToCart,
        errorMessage
    } = useProductContent({
        product,
        fromListingPage: true
    });

    const {
        visibleOptions,
        showOptionsPartially,
        setShowOptionsPartially,
        imageUrl,
        showReviewSummary
    } = useItem({
        product,
        variant
    });
    const { __ } = useTranslations();
    return (
        <div className={classes.root}>
            <div className={classes.body}>
                {
                    addToCartEnabled
                    ?   product.images &&
                        <div className={`${addToCartEnabled ? classes.giftCardImageWrapper : classes.productImageWrapper}`}>
                            <Image className={classes.productImage} width={400} src={imageUrl} />
                        </div>
                    :   product.images &&
                            <div className={largeItems ? classes.productImageWrapperLarge : classes.productImageWrapper} onClick={() => history.push(`/${product.urlKey}`)}>
                                <Image className={classes.productImage} width={400} src={imageUrl} />
                            </div>
                            
                }
                <div className={`${addToCartEnabled ? classes.giftCardName : classes.nameField}`}>
                    {
                        addToCartEnabled
                        ?   <span className={classes.name}>
                                {product.name}
                            </span>
                        : <span className={classes.name} onClick={() => history.push(`/${product.urlKey}`)}>{product.name}</span>
                    }
                </div>
                <div className={`${addToCartEnabled ? classes.giftCardPrice : classes.price}`}>
                    <ProductPrice
                        product={product} variant={variant}
                        classes={{
                            price: classes.price,
                        }}
                    />
                </div>
                <div className={classes.optionsWrapper}>
                    <div className={classes.options}>
                        <ProductOptions 
                            product={product} 
                            options={allowedOptions} 
                            onSelectionChange={handleSelectionChange}
                            visibleOptions={visibleOptions}
                            selectedValues={optionSelections}
                            fromListingPage={true}
                        />
                    </div>
                </div>
                {
                    addToCartEnabled
                    ?   <div>
                            {(!showOptionsPartially || !allowedOptions.length || allowedOptions.length == visibleOptions.length) && 
                                <div className={classes.cartActions}>
                                    {   errorMessage
                                        ?   <div className={classes.errorMessage}>
                                                {errorMessage}
                                            </div>
                                        :   null
                                    }
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
                        </div>
                    :   null
                }
            </div>
        </div>
    );
}

export default Item;