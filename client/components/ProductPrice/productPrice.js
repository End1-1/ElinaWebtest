import React, { useMemo } from 'react';
import defaultClasses from 'Components/ProductPrice/productPrice.module.css';
import { useSelector } from 'react-redux';
import Price from 'Components/Price';
import { mergeClasses } from 'Helper/classify'
const ProductPrice = props => {
    const { product, variant, place } = props;
    const baseCurrency = useSelector(state => state.shop.currentShop.baseCurrency);
    const classes = mergeClasses(defaultClasses, props.classes)
    // Depending on product type
    const priceData = useMemo(() => {
        if (variant && variant.product.price) {
            return {
                amount: variant.product.price,
                discountedAmount: variant.product.discountedPrice,
                discountType: variant.product.discountType,
                discount: variant.product.discount
            };
        } else {
            return {
                amount: product.price,
                discountedAmount: product.discountedPrice,
                discountType: product.discountType,
                discount: product.discount
            };
        }
    }, [product, variant]);

    return (
        <div className={classes.root}>
            <Price classes={classes} className={`${classes.price} ${classes[place]}`} {...priceData} />
        </div>
    );
};

ProductPrice.defaultProps = {
    place: 'categoryListing'
}

export default ProductPrice;
