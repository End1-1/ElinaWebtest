import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { submitShippingAddress } from 'Store/actions/cart';
import { addCustomerAddress, editCustomerAddress } from 'Store/actions/auth';

export const useShippingAddressForm = (props) => {
    const { registerCheckoutItem } = props;
    const { details: cart, isFetchingCart } = useSelector(state => state.cart);
    const { isSignedIn, currentUser } = useSelector(state => state.auth);
    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const [formApi, setFormApi] = useState();
    const [isReady, setIsReady] = useState(false);
    const [addressPopupState, setAddressPopupState] = useState({
        visible: false
    });
    const { __ } = useTranslations();
    const dispatch = useDispatch();
    const { addresses } = currentUser;

    const handleSubmit = useCallback(async (address) => {
        if (isSignedIn) {
            delete address.saveAsAddress;
            const updatedCustomer = await dispatch(addCustomerAddress(address));
            const { lastActionId } = updatedCustomer;
            if (lastActionId) {
                await dispatch(submitShippingAddress({
                    addressId: lastActionId
                }));
            }
            setAddressPopupState({
                visible: false
            });
        } else {
            await dispatch(submitShippingAddress(address));
            setAddressPopupState({
                visible: false
            });        
        }
        setFormApi();
    }, [isSignedIn, addressPopupState]);

    const handleAddressSelect = useCallback((address) => {
        dispatch(submitShippingAddress(address));
    }, []);


    const handleCheckoutItemSubmit = useCallback(() => {
        formApi.submitForm();
    }, [formApi]);

    const handleEditAddress = useCallback(async (address) => {
        await dispatch(editCustomerAddress(addressPopupState.address.addressId, address));
        setAddressPopupState({
            visible: false
        });
    }, [editCustomerAddress, addressPopupState, showAddressPopup]);

    useEffect(() => {
        if (cart.shippingAddress && (cart.shippingAddress.firstName || cart.shippingAddress.addressId)) {
            setIsReady(true);
        }
    }, [cart]);

    useEffect(() => {
        if((!cart.shippingAddress || !cart.shippingAddress.firstName || !cart.shippingAddress.addressId) && addresses && addresses.length) {
            const defaultShippingAddress = addresses.find(address => address.isDefaultShipping);
            if(defaultShippingAddress) {
                handleAddressSelect({ addressId: defaultShippingAddress.addressId })
            }
        }
    }, [addresses, cart]);

    useEffect(() => {
        registerCheckoutItem({
            id: 'shippingForm',
            step: {
                id: 'shipping',
                title: "shipping"
            },
            submit: handleCheckoutItemSubmit,
            isSubmitting: formApi && (formApi.isSubmitting || formApi.isValidating) ? true : false,
            isReady 
        });
    }, [isReady, formApi, handleCheckoutItemSubmit]);

    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    return {
        cart,
        handleAddressSelect,
        handleSubmit,
        isSignedIn,
        setFormApi,
        currentUser,
        isFetchingCart,
        showAddressPopup,
        setShowAddressPopup,
        isReady,
        __,
        addressPopupState,
        setAddressPopupState,
        handleEditAddress
    }
}