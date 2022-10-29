import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

const PlaceOrderDefault = props => {
    const { handleOriginalPlaceOrder, shouldSubmitPayment, openSuccessModal } = props;
    const history = useHistory();
    const handlePlaceOrder = useCallback(async () => {
        console.log('will placec order default');
        try {
            const orderData = await handleOriginalPlaceOrder({
                clearCart: true
            });
            if (orderData) {
                history.push('checkout/success')
            }
        } catch (error) {
            console.log('error', error);
        }
    }, [handleOriginalPlaceOrder]);

    useEffect(() => {
        if (shouldSubmitPayment) {
            handlePlaceOrder();
        }
    }, [shouldSubmitPayment]);

    // We don't have a button to submit this, because checkout will make
    // shouldSubmitPayment = true and it will auto-submit. The other apprech
    // was to show the button for each method (like in magento), but changed to
    // this one
    return null;
}

export default PlaceOrderDefault;