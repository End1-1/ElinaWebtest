import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLink } from 'Talons/Link/useLink';

const PlaceOrderDefault = props => {
    const { handleOriginalPlaceOrder, shouldSubmitPayment } = props;
    const history = useHistory();

    const { getLocalizedUrl } = useLink();

    const handlePlaceOrder = useCallback(async () => {
        console.log('will placec order default');
        try {
            const orderNumber = await handleOriginalPlaceOrder();
            console.log('orderNumber', orderNumber);
            history.replace(getLocalizedUrl('checkout/success'));
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