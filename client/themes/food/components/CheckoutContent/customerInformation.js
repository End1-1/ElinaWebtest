import React from "react";
import defaultClasses from "./customerInformation.module.css";
import Loading from "Components/Loading";
import Button from "Components/Button";
import AddressForm from "Components/AddressForm";
import { useShippingAddressForm } from "Talons/Checkout/useShippingAddressForm";
import { mergeClasses } from "Helper/classify";
import Modal from "Components/Modal";

const CustomerInformation = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
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
  } = useShippingAddressForm({
    ...props,
  });

  if (isFetchingCart || (!cart.shippingAddress && currentUser.id)) {
    return <Loading />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.headingContainer}>
        <h4 className={`${classes.heading} ${isReady ? classes.ready : ""}`}>
          {"Customer information"}
        </h4>
      </div>
      {isSignedIn ? (
        <div className={classes.addresses}>
          {currentUser &&
          currentUser.addresses &&
          currentUser.addresses.length ? (
            currentUser.addresses.map((address) => (
              <AddressCard
                key={address.addressId}
                address={address}
                selected={
                  cart.shippingAddress &&
                  cart.shippingAddress.addressId == address.addressId
                }
              >
                <Button
                  onClick={() =>
                    handleAddressSelect({ addressId: address.addressId })
                  }
                >
                  {__("select.address.text")}
                </Button>
              </AddressCard>
            ))
          ) : (
            <>
              <span>You don't have addresses saved.</span>
              <Button onClick={() => setShowAddressPopup(true)}>
                {__("add.new.address")}
              </Button>
            </>
          )}
          <Modal
            open={showAddressPopup}
            onClose={() => setShowAddressPopup(false)}
          >
            <AddressForm
              setFormApi={setFormApi}
              type={"shipping"}
              showSaveAsAddress={true}
              initialValues={
                cart.shippingAddress && !cart.shippingAddress.addressId
                  ? cart.shippingAddress
                  : {}
              }
              onSubmit={handleSubmit}
            />
          </Modal>
        </div>
      ) : (
        <div className={classes.guestInfo}>
          <AddressForm
            setFormApi={setFormApi}
            type={"shipping"}
            showSaveAsAddress={false}
            initialValues={
              cart.shippingAddress && !cart.shippingAddress.addressId
                ? cart.shippingAddress
                : {}
            }
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerInformation;
