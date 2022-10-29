import React, { Fragment } from 'react';
import defaultClasses from './shippingAddressForm.module.css';
import Loading from '../Loading';
import Button from '../Button';
import AddressForm from '../AddressForm';
import AddressCard from '../AddressCard';
import { useBillingAddressForm } from 'Talons/Checkout/useBillingAddressForm';
import { mergeClasses } from 'Helper/classify';
import Modal from 'Components/Modal';

const BillingAddressForm  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        cart,
        handleAddressSelect,
        handleSubmit,
        isSignedIn,
        currentUser,
        isFetchingCart,
        showAddressPopup,
        setShowAddressPopup,
        sameAsShipping,
        setFormApi,
        handleSameAsShippingChange,
        __
    } = useBillingAddressForm({
        ...props
    });

    if (isFetchingCart || (!cart.billingAddress && currentUser.id)) {
        return <Loading />
    }

    return (
        <div className={classes.root}>
            <h4 className={classes.heading}>{__('billing.address.form.heading')}</h4>
            <div>
                <label htmlFor={`sameAsShippingAddress`}>{__('same.as.shipping.address')}</label>
                <input id={`sameAsShippingAddress`} type={'checkbox'} checked={sameAsShipping} onChange={(e) => handleSameAsShippingChange(e.target.checked)} />
            </div>
            {!sameAsShipping && 
                <Fragment>
                    {isSignedIn ? 
                        <div className={classes.addresses}>
                            {currentUser && currentUser.addresses ? currentUser.addresses.map(address => 
                                <AddressCard key={address.addressId} address={address} selected={cart.billingAddress && cart.billingAddress.addressId == address.addressId}>
                                    <Button onClick={() => handleAddressSelect({ addressId: address.addressId })}>{__('select.address.text')}</Button>
                                </AddressCard>)
                            : <span>You don't have addresses saved.</span>}
                            <Button onClick={() => setShowAddressPopup(true)}>{__('add.new.address')}</Button>
                            <Modal
                                open={showAddressPopup}
                                onClose={() => setShowAddressPopup(false)}>
                                <AddressForm setFormApi={props.setFormApi} type={'billing'} showSaveAsAddress={true} initialValues={cart.shippingAddress && !cart.shippingAddress.addressId ? cart.shippingAddress : {}} onSubmit={handleSubmit} />
                            </Modal>
                        </div> :
                        <AddressForm setFormApi={setFormApi} type={'billing'} showSaveAsAddress={false} initialValues={cart.billingAddress && !cart.billingAddress.addressId ? cart.billingAddress : {}} onSubmit={handleSubmit} />
                    }
                </Fragment>
            }
        </div>
    );
}

export default BillingAddressForm;