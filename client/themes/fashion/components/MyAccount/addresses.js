import React from 'react';
import classes from './addresses.module.css';
import Button from 'Components/Button';
import AddressForm from 'Components/AddressForm';
import AddressCard from 'Components/AddressCard';
import { useAddresses } from 'Talons/Account/useAddresses';
import Tabs from './tabs';
import Link from 'Components/Link';
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
            <h3 className={classes.headline}><span>{__('Addresses')}</span></h3>
            <div className={classes.container}>
                <Tabs active={'addresses'} />
                <div className={classes.content}>
                    <div className={classes.addressesInfo}>
                        <div className={classes.billing}>
                            <h3 className={classes.title}>
                                <span className={'bluTitle'}>{__('default.billing.address')}</span>
                            </h3>
                            {currentUser.addresses.find(address => address.isDefaultBilling) ?
                                <AddressCard address={currentUser.addresses.find(address => address.isDefaultBilling)} />
                                : <span>{__('You have not set a default billing address.')}</span>
                            }
                            <Link to={'/account/addresses'}>{__('edit')}</Link>
                        </div>
                        <div className={classes.shipping}>
                            <h3 className={classes.title}>
                                <span className={'bluTitle'}>{__('default.shipping.address')}</span>
                            </h3>
                            {currentUser.addresses.find(address => address.isDefaultShipping) ? <AddressCard
                                address={currentUser.addresses.find(address => address.isDefaultShipping)}
                            /> : <span>{__('You have not set a default shipping address.')}</span>}
                            <Link to={'/account/addresses'}>{__('edit')}</Link>
                        </div>
                    </div>
                    <div className={classes.addresses}>
                        <h3 className={classes.title}>
                            <span className={'bluTitle'}>{__('Additional Address Entires')}</span>
                        </h3>
                        <div className={classes.addressesBlock}>
                            {currentUser && currentUser.addresses.map(address =>
                                <AddressCard key={address.addressId} address={address}>
                                    <div className={classes.actions}>
                                        <Button loading={isRemovingAddressId == address.addressId} onClick={() => handleRemoveAddress(address.addressId)}>{__('remove')}</Button>
                                        <Button onClick={() => setAddressPopupState({ visible: true, mode: 'edit', address })}>{__('edit')}</Button>
                                    </div>
                                </AddressCard>
                            )}
                            <Button onClick={() => setAddressPopupState({ visible: true, mode: 'new'})}>{__('add.new.address')}</Button>
                        </div>
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
        </div>
    );
}

export default Addresses;