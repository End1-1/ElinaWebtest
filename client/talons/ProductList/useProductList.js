import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from 'Store/actions/cart';


export const useProductList = (props) => {
    const { data, isFetchingList } = useSelector(state => state.product);
    const [isAddingToCart, setIsAddingToCart] = useState();
    
    const dispatch = useDispatch();


    const handleAddToCart = useCallback(async (product) => {
        console.log('Adding to cart', product);
        setIsAddingToCart(product.ProductID);
        await dispatch(addProductToCart({
            productId: product.ProductID,
            name: product.Name,
            quantity: 1
        }));
        setIsAddingToCart(null);
    }, []);
    
    return {
        isFetchingList,
        products: data,
        handleAddToCart
    }
}