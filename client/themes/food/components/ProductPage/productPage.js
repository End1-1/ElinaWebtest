import React from 'react';
import defaultClasses from './productPage.module.css'
import ProductContent from "../ProductContent";
import {useSelector} from "react-redux";
import {mergeClasses} from 'Helper/classify';
import Breadcrumbs from "Components/Breadcrumbs";
import ReviewList from 'Components/ReviewList';

const ProductPage = (props) => {
    const {productId, product, breadcrumbs} = props;
    const classes = mergeClasses(defaultClasses, props.classes)
    const {currentShopId} = useSelector(state => state.shop);

    return (
        <div className={classes.root}>
            <div className={classes.breadcrumbs}>
                <Breadcrumbs crumbs={breadcrumbs}/>
            </div>
            {product && <ProductContent product={product}/>}
            <ReviewList product={product} />
        </div>
    );
}

export default ProductPage;