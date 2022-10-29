import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartInit, removeItemFromCart, updateCartItems } from 'Store/actions/cart';
import { useTranslations } from 'Talons/App/useTranslations';

export const useMinicart = (props) => {
    const { data, currentShopId } = useSelector(state => state.shop);
    const { details: cart, isFetchingCart } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { __ } = useTranslations();

    const handleRemoveItem = useCallback((itemId) => {
        dispatch(removeItemFromCart(itemId));
    }, [removeItemFromCart]);

    const handleChangeItemQuantity = useCallback((item, quantity) => {
        dispatch(updateCartItems([
            {
                itemId: item.id,
                quantity
            }
        ]));
    }, [updateCartItems]);

    // Set first's shop as current one if not set yet
    useEffect(() => {
        if (currentShopId) {
            dispatch(cartInit());
        }
    }, [currentShopId]);

    return {
        cart,
        handleRemoveItem,
        isFetchingCart,
        handleChangeItemQuantity,
        __
    }
}