import React from 'react';
import { useProductSlider } from 'Talons/ProductSlider/useProductSlider';
import ProductList from 'Components/ProductList';

const Preview = (props) => {
    const { categoryId, itemsPerRow } = props;

    const {
        items
    } = useProductSlider({
        type: 'category',
        id: categoryId
    });

    return (
        <ProductList products={items} itemsPerRow={itemsPerRow} />
    );
}

export default Preview;