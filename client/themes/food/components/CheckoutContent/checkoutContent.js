import React, { useMemo } from "react";
import classes from "./checkoutContent.module.css";
import Loading from "Components/Loading";
import CustomerInformation from "Components/CheckoutContent/customerInformation";
import PaymentMethods from "Components/PaymentMethods";
import Totals from "Components/CheckoutContent/Totals";
import Button from "Components/Button";
import PlaceOrderDefault from "Components/PaymentDefault";
import PlaceOrderAmeria from "Components/PaymentAmeria";
import PlaceOrderIdram from "Components/PaymentIdram";
import Breadcrumbs from "Components/Breadcrumbs";
import { useCheckout } from "Talons/Checkout/useCheckout";
import RadioButtonList from "Components/CheckoutContent/radioButtonList";
import Price from "Components/Price";

const CheckoutContent = (props) => {
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
    __,
  } = useCheckout();

  const placeOrderComponent = useMemo(
    (props) => {
      if (!cart.paymentMethod || !cart.paymentMethod.methodCode) {
        return (
          <PlaceOrderDefault
            handleOriginalPlaceOrder={handleSubmitOrder}
            shouldSubmitPayment={shouldSubmitPayment}
          />
        );
      }
      switch (cart.paymentMethod.methodCode) {
        case "ameriaBank":
          return (
            <PlaceOrderAmeria
              handleOriginalPlaceOrder={handleSubmitOrder}
              shouldSubmitPayment={shouldSubmitPayment}
            />
          );
        case "idram":
          return (
            <PlaceOrderIdram
              handleOriginalPlaceOrder={handleSubmitOrder}
              shouldSubmitPayment={shouldSubmitPayment}
            />
          );
        default:
          return (
            <PlaceOrderDefault
              handleOriginalPlaceOrder={handleSubmitOrder}
              shouldSubmitPayment={shouldSubmitPayment}
            />
          );
      }
    },
    [cart.paymentMethod, handleSubmitOrder, shouldSubmitPayment]
  );

  if (isFetchingCart) {
    return <Loading />;
  }

  if (cart.items && !cart.items.length) {
    return <span>Cart is empty</span>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.breadcrumbsBox}>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: "Fast Food", link: "/" },
            { label: "Black Burger", link: "/" },
            { label: "Order Now", link: null },
          ]}
        />
      </div>
      <div className={classes.main}>
        <div className={classes.left}>
          <CustomerInformation registerCheckoutItem={registerCheckoutItem} />
          <div className={classes.payment}>
            <div className={classes.delivery}>
              <div className={classes.deliveryHeader}>
                <h4 className={classes.deliveryHeading}>{"Delivery"}</h4>
              </div>
              <div className={classes.deliveryBody}>
                <RadioButtonList
                  items={[
                    {
                      id: "delivery",
                      label: (
                        <span className={classes.deliveryLabel}>
                          <Price amount={cart.shippingTotal} /> {"Delivery"}
                        </span>
                      ),
                    },
                  ]}
                />
              </div>
            </div>

            <div className={classes.methods}>
              <div className={classes.methodsHeader}>
                <h4 className={classes.methodsHeading}>{"Payment Method"}</h4>
              </div>
              <div className={classes.methodsBody}>
                <PaymentMethods />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.sidebar}>
          <div className={classes.orderDetails}>
            <div className={classes.detailsHeader}>
              <h4 className={classes.detailsHeading}>{"Order Details"}</h4>
            </div>
            <div className={classes.detailsBody}>
              <div>
                <Totals />
              </div>
              <div className={classes.btnContainer}>
                <Button
                  classes={{ button: classes.btn }}
                  onClick={handleSubmitStep}
                  loading={isSubmitting}
                >
                  {isLastStep ? "Order Now" : __("go.to.next.step")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContent;
