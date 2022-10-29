import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from 'Talons/App/useTranslations';
import { addCustomerAddress, removeCustomerAddress, editCustomerAddress } from 'Store/actions/auth';
import { submitShippingAddress } from '../../store/actions/cart';

export const useAddresses = props => {
    const { currentUser } = useSelector(state => state.auth);
    const [isRemovingAddressId, setIsRemovingAddressId] = useState();
    const [addressPopupState, setAddressPopupState] = useState({
        visible: false
    });

    const dispatch = useDispatch();

    const { __ } = useTranslations();
    
    const handleAddAddress = useCallback(async (address) => {
        await dispatch(addCustomerAddress(address));
        setAddressPopupState({
            visible: false
        });
    }, [addCustomerAddress]);

    const handleEditAddress = useCallback(async (address) => {
        await dispatch(editCustomerAddress(addressPopupState.address.addressId, address));
        if (address.isDefaultShipping) {
            await dispatch(submitShippingAddress({ addressId: addressPopupState.address.addressId }));
        }
        setAddressPopupState({
            visible: false
        });
    }, [editCustomerAddress, addressPopupState, submitShippingAddress]);

    const handleEditAddressDefaultShipping = useCallback(async (addressId, address) => {
        await dispatch(editCustomerAddress(addressId, address));
        if (address.isDefaultShipping) {
            await dispatch(submitShippingAddress({addressId}));
        }
    }, [editCustomerAddress, submitShippingAddress]);

    const handleRemoveAddress = useCallback(async (addressId) => {
        setIsRemovingAddressId(addressId);
        await dispatch(removeCustomerAddress(addressId));
        setIsRemovingAddressId(null);
    }, [setIsRemovingAddressId]);

    return {
        currentUser,
        handleAddAddress,
        handleEditAddress,
        handleRemoveAddress,
        isRemovingAddressId,
        addressPopupState,
        setAddressPopupState,
        handleEditAddressDefaultShipping,
        __
    }
}