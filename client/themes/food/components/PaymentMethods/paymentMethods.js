import React, { useMemo } from "react";
import defaultClasses from "./paymentMethods.module.css";
import { usePaymentMethods } from "Talons/PaymentMethods/usePaymentMethods";
import { useTranslations } from "Talons/App/useTranslations";
import { mergeClasses } from "Helper/classify";
import RadioButton from "Components/CheckoutContent/radioButton";

const PaymentMethods = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const {
    paymentMethods,
    isFetchingPaymentMethods,
    handlePaymentMethodSelect,
    paymentMethod,
    isSubmitting,
  } = usePaymentMethods();

  const { __ } = useTranslations();

  if (isFetchingPaymentMethods) {
    return null;
  }

  if (!paymentMethods.length) {
    return <p>{__("No payments methods found")}</p>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.methods}>
        {paymentMethods.map((method) => (
          <RadioButton
            key={method.methodCode}
            onClick={() =>
              handlePaymentMethodSelect({ methodCode: method.methodCode })
            }
            label={method.methodName}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
