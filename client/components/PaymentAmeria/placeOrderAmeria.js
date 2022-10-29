import React  from 'react';
import Button from '../Button';
import { usePlaceOrderAmeria } from 'Talons/PaymentAmeria/usePlaceOrderAmeria';

const PlaceOrderAmeria = props => {
    const { handleOriginalPlaceOrder, shouldSubmitPayment } = props;

    const {
        handlePlaceOrder
    } = usePlaceOrderAmeria({
        handleOriginalPlaceOrder,
        shouldSubmitPayment
    });

    // We don't have a button to submit this, because checkout will make
    // shouldSubmitPayment = true and it will auto-submit. The other apprech
    // was to show the button for each method (like in magento), but changed to
    // this one

    
    return null;
}

export default PlaceOrderAmeria;