import React, { useMemo } from 'react';
import classes from './checkoutContent.module.css';
import Loading from 'Components/Loading';
import ShippingAddressForm from './shippingAddressForm';
import BillingAddressForm from './billingAddressForm';
import ShippingMethodsForm from 'Components/ShippingMethodsForm';
import PaymentMethods from 'Components/PaymentMethods';
import Totals from 'Components/Totals';
import Button from 'Components/Button';
import CouponCodeForm from 'Components/CouponCodeForm';
import PlaceOrderDefault from 'Components/PaymentDefault';
import PlaceOrderAmeria from 'Components/PaymentAmeria';
import PlaceOrderIdram from 'Components/PaymentIdram';
import Identity from './identity';
import CartItems from 'Components/CheckoutContent/items';
import { useCheckout } from 'Talons/Checkout/useCheckout';

const CheckoutContent  = props => {
    const {
        cart,
        handleSubmitStep,
        handleSubmitOrder,
        isSignedIn,
        registerCheckoutItem,
        isFetchingCart,
        checkoutSteps,
        activeStep,
        isLastStep,
        shouldSubmitPayment,
        handleChangeActiveStep,
        isSubmitting,
        __
    } = useCheckout();

    const placeOrderComponent = useMemo( props => {
        if (!cart.paymentMethod || !cart.paymentMethod.methodCode) {
            return <PlaceOrderDefault handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment} />;
        }
        switch (cart.paymentMethod.methodCode) {
            case 'ameriaBank':
                return <PlaceOrderAmeria handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment} />;
            case 'idram':
                return <PlaceOrderIdram handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment} />;
            default:
                return <PlaceOrderDefault handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment} />;
        }
    }, [cart.paymentMethod, handleSubmitOrder, shouldSubmitPayment]);

    if (isFetchingCart) {
        return <Loading />
    }

    if (cart.items && !cart.items.length) {
        return <span>Cart is empty</span>
    }

    return (
        <div className={classes.root}>
            <h1><span className="bluTitle">{__('checkout')}</span></h1>
            <div className={classes.main}>
                <div className={classes.left}>
                    {Object.values(checkoutSteps).length && <div className={classes.steps}>
                        {Object.values(checkoutSteps).map(step => 
                            <div key={step.id} className={`${classes.step} ${activeStep == step.id ? classes.active: ''}`} onClick={() => handleChangeActiveStep(step.id)}>
                                <span>{__(step.title)}</span>
                            </div>
                        )}
                    </div>}
                    {!!!activeStep || activeStep == 'shipping' ?
                        <div>
                            <div>
                                {!isSignedIn && <Identity registerCheckoutItem={registerCheckoutItem} />}
                            </div>
                            <ShippingAddressForm registerCheckoutItem={registerCheckoutItem} />
                            <div>
                                <ShippingMethodsForm registerCheckoutItem={registerCheckoutItem} />
                            </div>
                        </div>
                    : null}
                    {!!!activeStep || activeStep == 'billing' ?
                        <div>
                            <BillingAddressForm registerCheckoutItem={registerCheckoutItem} />
                            <div>
                                <PaymentMethods />
                            </div>
                            <div className={classes.couponCodeForm}>
                            </div>
                        </div>
                    : null}
                </div>
                <div className={classes.sidebar}>
                    <div className={classes.couponCodeForm}>
                        <CouponCodeForm />
                    </div>
                    <Totals />
                    <CartItems />
                    {placeOrderComponent}
                    <Button onClick={handleSubmitStep} loading={isSubmitting}>{isLastStep ? __('place.order') : __("go.to.next.step")}</Button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutContent;