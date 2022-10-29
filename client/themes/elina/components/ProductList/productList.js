import React from 'react';
import defaultClasses from './productList.module.css';
import { useProductList } from 'Talons/ProductList/useProductList';
import { useTranslations } from 'Talons/App/useTranslations';
import GalleryItem from 'Components/Gallery/item';
import Link from 'Components/Link';
import Placeholder from './placeholder';
import Image from 'Components/Image';
import { mergeClasses } from "Helper/classify"
import get from 'lodash/get';

const ProductList  = props => {
    const { products, isFetchingProducts, placementInfo, categoryUrlKey, addToCartEnabled, largeItems } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        isFetchingList
    } = useProductList();

    const { __ } = useTranslations();
    
    if (isFetchingProducts) {
        return <Placeholder />;
    }

    if (!products.length) {
        return <p>{__("no.products.found")}</p>
    }
    const imageUrl = product => {
        return get(product, "variants[0].product.images[0].path", "") || get(product, "images[0].path", "") 
    }
    return (
        <div className={`${addToCartEnabled ? classes.giftCardRoot : classes.root}`}>
            <div className={classes.list}>
                {products && products.map((product, index) => {
                    if(index == products.length-1 && categoryUrlKey) {
                        return (
                            <Link to={`/${categoryUrlKey}`} key={index}>
                                {product.images &&
                                    <div className={classes.productImageWrapper}>
                                        <Image className={classes.productImage} width={400} src={imageUrl(product)} />
                                        <div className={classes.overlay}>
                                            <span className={classes.overlayText}>
                                                {__("view.more")}
                                            </span>
                                        </div>
                                    </div>
                                }
                            </Link>
                        )
                    }
                    return (
                        <GalleryItem
                            key={product.id} 
                            product={product} 
                            placementInfo={placementInfo} 
                            classes={{root: classes.itemRoot}}
                            addToCartEnabled={addToCartEnabled}
                            largeItems={largeItems}
                        />
                    )
                }
                )}
            </div>
        </div>
    );
}

export default ProductList;