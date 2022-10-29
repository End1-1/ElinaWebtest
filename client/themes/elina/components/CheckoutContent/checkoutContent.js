import React, {Fragment, useMemo, useState } from 'react';
import classes from './checkoutContent.module.css';
import Loading from 'Components/Loading';
import ShippingAddressForm from 'Components/CheckoutContent/shippingAddressForm';
import ShippingMethodsForm from 'Components/ShippingMethodsForm';
import PaymentMethods from 'Components/PaymentMethods';
import Totals from 'Components/Totals';
import Button from 'Components/Button';
import PlaceOrderDefault from 'Components/PaymentDefault';
import PlaceOrderAmeria from 'Components/PaymentAmeria';
import PlaceOrderIdram from 'Components/PaymentIdram';
import Identity from 'Components/CheckoutContent/identity';
import {useCheckout} from 'Talons/Checkout/useCheckout';
import Navigation from 'Components/CartContent/navigation';
import Link from 'Components/Link';
import TextArea from 'Components/TextArea';
import Item from 'Components/Minicart/item';
import SignInModal from 'Components/Header/signInModal';
import useWindowSize from "../../../../hooks/useWindowSize";
import isEmpty from 'lodash/isEmpty';

const CheckoutContent  = props => {
    const {
        cart,
        handleRemoveItem,
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
        __,
        showSignInSignUp,
        closeModal,
        signInSignUp,
        isOpenSuccessModal,
        openSuccessModal,
        closeSuccessModal,
        comment,
        setComment,
        guestInfo,
        setGuestInfo,
        isBackToShipping,
        errorMessage,
        isStepSubmittionTriggered
    } = useCheckout();

    const {width} = useWindowSize();
    const [orderData, setOrderData] = useState();

    const placeOrderComponent = useMemo(props => {
        if(orderData){
            return <PlaceOrderIdram handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment} orderData={orderData} setOrderData={setOrderData}/>;
        }
        if (!cart.paymentMethod || !cart.paymentMethod.methodCode) {
            return <PlaceOrderDefault handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment} openSuccessModal={openSuccessModal}/>;
        }
        switch (cart.paymentMethod.methodCode) {
            case 'ameriaBank':
                return <PlaceOrderAmeria handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment}/>;
            case 'idram':
                return <PlaceOrderIdram handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment} orderData={orderData} setOrderData={setOrderData}/>;
            default:
                return <PlaceOrderDefault handleOriginalPlaceOrder={handleSubmitOrder} shouldSubmitPayment={shouldSubmitPayment} openSuccessModal={openSuccessModal}/>;
        }
    }, [cart.paymentMethod, handleSubmitOrder, shouldSubmitPayment, orderData]);


    if (cart.items && !cart.items.length) {
        return(
            <div  className={classes.titleNotFound}>
                <span>{__("empty.cart.text")}</span>
            </div>
        )
    }

    if((shouldSubmitPayment && isSubmitting) || (isEmpty(cart) && !shouldSubmitPayment && !isSubmitting)) {
        return <Loading />
    }

    return (
        <div className={classes.root}>
            {width > 768 && <div className={classes.breadcrumbs}>
                <Link to="/" classes={{link: classes.link}}>
                    {__("home")}
                </Link>
                <span className={classes.line}>|</span>
                <span className={activeStep === "shipping" ? classes.currentStepLink : classes.link}
                      onClick={() => handleChangeActiveStep("shipping")}>
                    {__("shipping")}
                </span>
                <span className={classes.line}>|</span>
                <span className={activeStep === "billing" ? classes.currentStepLink : classes.link}
                      onClick={() => handleChangeActiveStep("billing")}>
                    {__("payment")}
                </span>
            </div>}
            <h1><span className={classes.title}>{__("shipping")}</span></h1>
            {errorMessage ? <div className={classes.errorMessage}>{errorMessage}</div> : null}
            <Navigation active={activeStep === "billing" ? "payment" : "delivery"} handleChangeActiveStep={handleChangeActiveStep}/>
            <div className={classes.main}>
                <div className={classes.left}>
                    {!activeStep || activeStep == 'shipping' ?
                        <Fragment>
                            <div>
                                {!isSignedIn && <Identity registerCheckoutItem={registerCheckoutItem} showSignInSignUp={showSignInSignUp}/>}
                            </div>
                            <ShippingAddressForm registerCheckoutItem={registerCheckoutItem} guestInfo={guestInfo} isBackToShipping={isBackToShipping}/>
                            {!isSignedIn ? 
                                <div className={classes.additionalInfo}>
                                    <h3 className={classes.infoTitle}>{__("additional.information")}</h3>
                                    <TextArea
                                        name=""   
                                        className={classes.textArea}
                                        value={guestInfo}
                                        onChange={(e) => setGuestInfo(e.target.value)}
                                    />
                                </div>
                                :
                                null
                            }
                            <div>
                                <ShippingMethodsForm registerCheckoutItem={registerCheckoutItem}/>
                            </div>
                            <p className={classes.bottomtext}>* {__("not.buying.order.message")}</p>
                        </Fragment>
                    : null}
                    {!activeStep || activeStep == 'billing' ?
                        <Fragment>
                            <div>
                                <PaymentMethods registerCheckoutItem={registerCheckoutItem}/>
                            </div>
                            <div>
                                <h4 className={classes.commentTitle}>{__("leave.a.comment")}</h4>
                                <TextArea
                                    name=""
                                    className={classes.commentTextArea}
                                    placeholder={`${__("your.review.")}...`}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                        </Fragment>
                        : null}
                    {(shouldSubmitPayment && !isSubmitting) || (!shouldSubmitPayment && !isSubmitting && cart && cart.paymentMethod && cart.paymentMethod.methodCode === "idram") ? placeOrderComponent : null}
                    <Button onClick={() => { window.scrollTo(0, 0); handleSubmitStep()}} loading={isSubmitting}
                            classes={isLastStep ? {button: classes.placeOrderButton} : {button: classes.nextStepButton}}>{isLastStep ? __('place.order') : __("go.to.next.step")}</Button>
                </div>
                {width > 900 && <div className={classes.sidebar}>
                    <div className={classes.list}>
                        {cart.items && cart.items.map(item =>
                            <Item
                                key={item.id}
                                item={item}
                                handleRemoveItem={handleRemoveItem}
                                classes={{removeIcon: classes.removeIcon, nameField: classes.nameField, body: classes.itemBody, details: classes.details}}
                            />
                        )}
                    </div>
                    <Totals/>
                </div>}
            </div>
            {signInSignUp 
                ?   <SignInModal 
                        openModal={!!signInSignUp} 
                        closeModal={closeModal} 
                        signInSignUp={signInSignUp}
                        showSignInSignUp={showSignInSignUp}
                        type="checkout"
                    />
                :   null
            }
        </div>
    );
}

export default CheckoutContent;