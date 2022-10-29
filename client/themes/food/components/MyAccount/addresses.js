import React from 'react';
import classes from 'Components/MyAccount/addresses.module.css';
import Button from 'Components/Button';
import AddressForm from 'Components/AddressForm';
import AddressCard from 'Components/AddressCard';
import Tabs from 'Components/MyAccount/tabs';
import { useAddresses } from 'Talons/Account/useAddresses';
import Modal from 'Components/Modal';

const Addresses  = props => {
    const {
        currentUser,
        handleAddAddress,
        handleEditAddress,
        handleRemoveAddress,
        isRemovingAddressId,
        addressPopupState,
        setAddressPopupState,
        __
    } = useAddresses();

    return (
        <div className={classes.root}>
            <Tabs active={'addresses'} />
            <div className={classes.content}>
                <div className={classes.addresses}>
                    {currentUser && currentUser.addresses.map(address => 
                        <AddressCard key={address.addressId} address={address}>
                            <Button loading={isRemovingAddressId == address.addressId} onClick={() => handleRemoveAddress(address.addressId)}>{__('remove')}</Button>
                            <Button onClick={() => setAddressPopupState({ visible: true, mode: 'edit', address })}>{__('edit')}</Button>
                        </AddressCard>
                    )}
                    <Button onClick={() => setAddressPopupState({ visible: true, mode: 'new'})}>{__('add.new.address')}</Button>
                </div>
                {addressPopupState.visible && <Modal
                    open={addressPopupState.visible}
                    onClose={() => setAddressPopupState({ visible: false })}>
                    <AddressForm 
                        type={'account'} 
                        showSetAsDefault={true}
                        showSaveAsAddress={false} 
                        initialValues={addressPopupState.mode == 'edit' ? addressPopupState.address : {}} 
                        onSubmit={addressPopupState.mode == 'edit' ? handleEditAddress : handleAddAddress} 
                    />
                </Modal>}
            </div>
        </div>
    );
}

export default Addresses;