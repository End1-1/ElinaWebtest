import React from 'react';
import classes from './addresses.module.css';
import Button from 'Components/Button';
import AddressForm from 'Components/AddressForm';
import AddressCard from 'Components/AddressCard';
import Tabs from './tabs';
import { useAddresses } from 'Talons/Account/useAddresses';
import Modal from 'Components/Modal';
import useWindowSize from "../../../../hooks/useWindowSize";

const Addresses  = props => {
    const {
        currentUser,
        handleAddAddress,
        handleEditAddress,
        handleRemoveAddress,
        isRemovingAddressId,
        addressPopupState,
        setAddressPopupState,
        handleEditAddressDefaultShipping,
        __
    } = useAddresses();
    const {width} = useWindowSize()

    return (
        <div className={classes.root}>
            {width>900 && <Tabs active={'addresses'}/>}
            <div className={classes.content}>
                <h3 className={classes.title}>{__('my.addresses.account.tab')}</h3>
                <div className={classes.addresses}>
                    {currentUser && currentUser.addresses.map(address => 
                        <AddressCard key={address.addressId} address={address} classes={{root:classes.addressesCardRoot}} handleEditAddressDefaultShipping={handleEditAddressDefaultShipping}>
                            <div className={classes.actions}>
                                <p className={classes.action} onClick={() => setAddressPopupState({ visible: true, mode: 'edit', address })}>{__('edit')}</p>
                                <p className={classes.action} onClick={() => handleRemoveAddress(address.addressId)}>{__('remove')}</p>
                            </div>
                        </AddressCard>
                    )}
                    <div className={classes.addAddress}>
                        <Button 
                            onClick={() => setAddressPopupState({ visible: true, mode: 'new'})}
                            classes={{button: classes.addButton}}
                        >
                            <span>+</span>
                        </Button>
                        <p 
                            className={classes.addAddressLabel}
                            onClick={() => setAddressPopupState({ visible: true, mode: 'new'})}
                        >
                            {__('add.new.address')}
                        </p>
                    </div>
                </div>
                {addressPopupState.visible && 
                    <Modal
                        open={addressPopupState.visible}
                        onClose={() => setAddressPopupState({ visible: false })}
                        classes={{content: classes.modalContent}}
                    >
                    <AddressForm 
                        mode={addressPopupState.mode}
                        type={'account'} 
                        showSaveAsAddress={false} 
                        initialValues={addressPopupState.mode == 'edit' ? addressPopupState.address : null} 
                        onSubmit={addressPopupState.mode == 'edit' ? handleEditAddress : handleAddAddress} 
                    />
                </Modal>}
            </div>
        </div>
    );
}

export default Addresses;