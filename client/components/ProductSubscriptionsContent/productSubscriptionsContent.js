import React from 'react';
import { mergeClasses } from 'Helper/classify';
import ProductList from 'Components/ProductList';
import defaultClasses from './productSubscriptionsContent.css';

const ProductSubscriptionsContent = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { items, isFetching } = props;

    return (
        <div className={classes.root}>
            <ProductList isFetchingList={isFetching} products={items}/>
        </div>
    )
}

export default ProductSubscriptionsContent;