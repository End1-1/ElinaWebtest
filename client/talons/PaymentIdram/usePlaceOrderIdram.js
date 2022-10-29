import { useCallback, useRef, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useConfig } from 'Talons/App/useConfig';
import { clearCartData } from 'Store/actions/cart';
import { useLink } from 'Talons/Link/useLink';

export const usePlaceOrderIdram = props => {
    const { handleOriginalPlaceOrder, shouldSubmitPayment, setOrderData } = props;
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { getConfigValue } = useConfig();
    const form = useRef(null);
    const { getLocalizedUrl } = useLink();

    const getReturnUrl = useCallback(() => {
        return window.location.origin + '/ameria/checkout/ipnGraphql';
    }, []);

    const merchantAccountId = useMemo(() => {
        return getConfigValue('idramMerchantId');
    }, []);

    const mode = useMemo(() => {
        return getConfigValue('idramMode');
    }, []);

    const handlePlaceOrder = useCallback(async () => {
        try {
            const orderData = await handleOriginalPlaceOrder({
                clearCart: false
            });
            setOrderData(orderData);
            setTimeout(() => {
                dispatch(clearCartData());
                const formEl = document.getElementById('idramForm');
                if (formEl) {
                    if (typeof formEl.requestSubmit === 'function') {
                        formEl.requestSubmit();
                    } else {
                        formEl.dispatchEvent(new Event('submit', {cancelable: true}));
                    }
                }
            }, 1000);
            return;
        } catch (error) {
            console.log('error', error);
        }
    }, [handleOriginalPlaceOrder, getReturnUrl, setOrderData, form]);

    useEffect(() => {
        if (shouldSubmitPayment) {
            handlePlaceOrder();
        }
    }, [shouldSubmitPayment]);

    const successPath = getLocalizedUrl('checkout/success');

    return {
        handlePlaceOrder,
        mode,
        merchantAccountId,
        form,
        successPath
    };
};