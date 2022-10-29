import { useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { submitBillingAddress } from 'Store/actions/cart';
import { addCustomerAddress } from 'Store/actions/auth';

export const useBillingAddressForm = (props) => {
    const { registerCheckoutItem, comment } = props;
    const { details: cart, isFetchingCart } = useSelector(state => state.cart);
    const { isSignedIn, currentUser } = useSelector(state => state.auth);
    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [formApi, setFormApi] = useState();
    const [isReady, setIsReady] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { __ } = useTranslations();
    const dispatch = useDispatch();

    const handleSubmit = useCallback(async (address) => {
        if (address.saveAsAddress) {
            delete address.saveAsAddress;
            const updatedCustomer = await dispatch(addCustomerAddress(address));
            const { lastActionId } = updatedCustomer;
            if (lastActionId) {
                await dispatch(submitBillingAddress({
                    addressId: lastActionId
                }));
                setIsReady(true);
            }
        } else {
            await dispatch(submitBillingAddress(address));
        }
    }, []);

    const handleAddressSelect = useCallback(async (address) => {
        await dispatch(submitBillingAddress(address));
    }, []);

    const handleSameAsShippingChange = useCallback(async (value) => {
        setSameAsShipping(value);
    }, []);

    const handleCheckoutItemSubmit = useCallback(async () => {
        if (sameAsShipping) {
            // await dispatch(submitBillingAddress({
            //     sameAsShipping
            // }));
        } else {
            formApi.submitForm();
        }
    }, [formApi, sameAsShipping, comment]);

    useEffect(() => {
        // We will inform the checkout component about our changes
        registerCheckoutItem({
            id: 'billingForm',
            step: {
                id: 'billing',
                title: "billing"
            },
            submit: handleCheckoutItemSubmit,
            isReady 
        });
    }, [isReady, formApi, handleCheckoutItemSubmit]);

    useEffect(() => {
        if (cart.billingAddress && (cart.shippingAddress.sameAsShipping || cart.shippingAddress.firstName || cart.shippingAddress.addressId)) {
            setIsReady(true);
        }
    }, [cart]);

    return {
        cart,
        handleAddressSelect,
        handleSubmit,
        setFormApi,
        isSignedIn,
        currentUser,
        isFetchingCart,
        showAddressPopup,
        setShowAddressPopup,
        sameAsShipping,
        handleSameAsShippingChange,
        isReady,
        __
    }
}