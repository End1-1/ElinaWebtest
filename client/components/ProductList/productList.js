import React from 'react';
import defaultClasses from './productList.module.css';
import { useProductList } from 'Talons/ProductList/useProductList';
import { useTranslations } from 'Talons/App/useTranslations';
import GalleryItem from 'Components/Gallery/item';
import Placeholder from './placeholder';
import { mergeClasses } from "Helper/classify"

const ProductList  = props => {
    const { products, isFetchingProducts, placementInfo, itemsPerRow } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        isFetchingList
    } = useProductList();

    const { __ } = useTranslations();
    
    if (isFetchingProducts) {
        return <Placeholder />;
    }

    if (!products.length) {
        return <p>No products found</p>
    }

    return (
        <div className={classes.root}>
            <div className={classes.list}  style={{ gridTemplateColumns: `repeat(${itemsPerRow || 4}, 1fr)` }}>
                {products && products.map(product => 
                    <GalleryItem key={product.id} product={product} placementInfo={placementInfo} />
                )}
            </div>
        </div>
    );
}

export default ProductList;