import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartInit, removeItemFromCart, clearCart, updateCartItems } from 'Store/actions/cart';
import { useTranslations } from 'Talons/App/useTranslations';


export const useCartContent = (props) => {
    const { data, currentShopId } = useSelector(state => state.shop);
    const { details: cart, isFetchingCart } = useSelector(state => state.cart);

    const { __ } = useTranslations();
    const dispatch = useDispatch();

    const handleRemoveItem = useCallback((item) => {
        dispatch(removeItemFromCart(item.id));
    }, [removeItemFromCart]);
    
    const handleChangeItemQuantity = useCallback((item, quantity) => {
        dispatch(updateCartItems([
            {
                itemId: item.id,
                quantity
            }
        ]));
    }, [updateCartItems]);

    const handleClearCart = useCallback((item) => {
        dispatch(clearCart());
    }, [clearCart]);
    
    return {
        cart,
        isFetchingCart,
        handleRemoveItem,
        handleChangeItemQuantity,
        handleClearCart,
        __
    }
}