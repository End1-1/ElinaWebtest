import React, {useMemo, useState} from 'react';
import defaultClasses from './shippingAddressForm.module.css';
import Loading from 'Components/Loading';
import Button from 'Components/Button';
import AddressForm from 'Components/AddressForm';
import AddressCard from 'Components/AddressCard';
import { useShippingAddressForm } from 'Talons/Checkout/useShippingAddressForm';
import { mergeClasses } from 'Helper/classify';
import Modal from 'Components/Modal';
import useWindowSize from '../../../../hooks/useWindowSize'
import Carousel from "react-multi-carousel";

const responsive = (width) => {
    return {
        desktop: {
            breakpoint: { max: 3000, min: 820 },
            items:3,
            partialVisibilityGutter: 30,
        },
        mobile: {
            breakpoint: { max: 820, min: 0 },
            items: width <= 540 ? 1 : 2,
            partialVisibilityGutter: width <= 390 ? 15 : width < 414 ? 70 : width < 425 ? 75 :width < 425 ? 90 : width <= 460 ? 100 : width <= 490 ? 130 :width <= 515 ? 150 : width < 540 ? 170 : width < 600 ? 12 :  width < 615 ? 15 : width < 650 ? 10 : width < 750 ? 5 :25
        },
    }
};

const ShippingAddressForm  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()
    const {
        cart,
        handleAddressSelect,
        handleSubmit,
        setFormApi,
        isSignedIn,
        currentUser,
        isFetchingCart,
        showAddressPopup,
        setShowAddressPopup,
        isReady,
        __,
        handleEditAddress,
        addressPopupState,
        setAddressPopupState
    } = useShippingAddressForm({
        ...props
    });
    const [sliderIndex, setSliderIndex] = useState(0);

    if (isFetchingCart || (!cart.shippingAddress && currentUser.id)) {
        return <Loading/>
    }
    if(width <= 815){
        return (
            <div className={classes.root}>
                <h4 className={`${classes.heading} ${isReady ? classes.ready : ''}`}>{isSignedIn ? __("shipping.addresses") : __("shipping.address")}</h4>
                {isSignedIn ?
                    <div className={classes.addresses}>
                        <Carousel
                            arrows={false}
                            partialVisbile
                            itemClass=""
                            showDots={false}
                            slidesToSlide={1}
                            responsive={responsive(width)}
                            ssr={true}
                            keyBoardControl={true}
                            focusOnSelect={false}
                            partialVisible
                            deviceType={"desktop"}
                            swipeable={true}
                            draggable={true}
                            infinite={false}
                            sliderClass={'react-multi-carousel-track'}
                        >
                            {currentUser && currentUser.addresses && currentUser.addresses.length
                                ? currentUser.addresses.map((address, index) =>
                                        <AddressCard type="checkout" key={address.addressId} address={address} selected={cart.shippingAddress && cart.shippingAddress.addressId == address.addressId}>
                                            <Button
                                                priority="secondary"
                                                classes={{button: classes.deliveryButton}}
                                                onClick={() => handleAddressSelect({addressId: address.addressId})}
                                                disabled={cart.shippingAddress && cart.shippingAddress.addressId == address.addressId}
                                            >
                                                <span>{__("select.address.text")}</span>
                                            </Button>
                                            <div className={classes.actions}>
                                                <p className={classes.action} onClick={() => setAddressPopupState({
                                                    visible: true,
                                                    mode: 'edit',
                                                    address
                                                })}>{__('edit')}</p>
                                            </div>
                                        </AddressCard>
                                )
                                : <span>{__("dont.have.addresses.saved")}</span>}
                        </Carousel>
                        <p className={classes.addNewAddress}
                           onClick={() => setAddressPopupState({visible: true, mode: 'new'})}>{__('add.new.address')}</p>
                        {addressPopupState.visible &&
                        <Modal
                            open={addressPopupState.visible}
                            onClose={() => setAddressPopupState({visible: false})}
                        >
                            <AddressForm
                                mode={addressPopupState.mode}
                                setFormApi={setFormApi}
                                initialValues={addressPopupState.mode == 'edit' ? addressPopupState.address : null}
                                onSubmit={addressPopupState.mode == 'edit' ? handleEditAddress : handleSubmit}
                            />
                        </Modal>
                        }
                    </div> :
                    <AddressForm type='checkout' setFormApi={setFormApi} showSaveAsAddress={false}
                                 initialValues={cart.shippingAddress && !cart.shippingAddress.addressId ? cart.shippingAddress : null}
                                 onSubmit={handleSubmit} guestInfo={props.guestInfo} isBackToShipping={props.isBackToShipping}/>
                }
            </div>
        )
    }
    return (
        <div className={classes.root}>
            <h4 className={`${classes.heading} ${isReady ? classes.ready : ''}`}>{isSignedIn ? __("shipping.addresses") : __("shipping.address")}</h4>
            {isSignedIn ?
                <div className={classes.addresses}>
                            {currentUser && currentUser.addresses && currentUser.addresses.length
                                ? currentUser.addresses.map((address, index) =>
                                     <div className={classes.addressCard}>
                                        <AddressCard type="checkout" key={address.addressId} address={address} selected={cart.shippingAddress && cart.shippingAddress.addressId == address.addressId}>
                                            <Button
                                                priority="secondary"
                                                classes={{button: classes.deliveryButton}}
                                                onClick={() => handleAddressSelect({addressId: address.addressId})}
                                                disabled={cart.shippingAddress && cart.shippingAddress.addressId == address.addressId}
                                            >
                                                <span>{__("select.address.text")}</span>
                                            </Button>
                                            <div className={classes.actions}>
                                                <p className={classes.action} onClick={() => setAddressPopupState({
                                                    visible: true,
                                                    mode: 'edit',
                                                    address
                                                })}>{__('edit')}</p>
                                            </div>
                                        </AddressCard>
                                     </div>
                                )
                                : <span>{__("dont.have.addresses.saved")}</span>}
                    <p className={classes.addNewAddress}
                       onClick={() => setAddressPopupState({visible: true, mode: 'new'})}>{__('add.new.address')}</p>
                    {addressPopupState.visible &&
                    <Modal
                        open={addressPopupState.visible}
                        onClose={() => setAddressPopupState({visible: false})}
                    >
                        <AddressForm
                            mode={addressPopupState.mode}
                            setFormApi={setFormApi}
                            initialValues={addressPopupState.mode == 'edit' ? addressPopupState.address : null}
                            onSubmit={addressPopupState.mode == 'edit' ? handleEditAddress : handleSubmit}
                        />
                    </Modal>
                    }
                </div> :
                <AddressForm type='checkout' setFormApi={setFormApi} showSaveAsAddress={false}
                             initialValues={cart.shippingAddress && !cart.shippingAddress.addressId ? cart.shippingAddress : null}
                             onSubmit={handleSubmit} guestInfo={props.guestInfo} isBackToShipping={props.isBackToShipping}/>
            }
        </div>
    );
}

export default ShippingAddressForm;