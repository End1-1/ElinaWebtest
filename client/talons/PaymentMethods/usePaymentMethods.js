import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentMethods, submitPaymentMethod } from 'Store/actions/cart';
import { useTranslations } from 'Talons/App/useTranslations';

export const usePaymentMethods = (props) => {
    const { registerCheckoutItem } = props;
    const { paymentMethods, isFetchingPaymentMethods, details } = useSelector(state => state.cart);
    const { currentLanguage } = useSelector(state => state.shop);
    const { paymentMethod } = details;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReady, setIsReady] = useState(paymentMethod ? true : false);
    const [message, setMessage] = useState(false);
    const { __ } = useTranslations();
    
    const dispatch = useDispatch();
    const { currentShopId } = useSelector(state => state.shop);

    const handlePaymentMethodSelect = useCallback(async (method) => {
        setIsSubmitting(true);
        await dispatch(submitPaymentMethod(method));
        setIsSubmitting(false);
        setIsReady(true);
        setMessage(false);
    }, [submitPaymentMethod, setIsSubmitting]);

    useEffect(() => {
        if (currentShopId) {
            dispatch(fetchPaymentMethods());
        }
    }, [currentShopId, currentLanguage]);

    useEffect(() => {
        registerCheckoutItem({
            id: 'paymentMethods',
            step: {
                id: 'billing',
                title: "billing"
            },
            submit: () => {
                if (!paymentMethod) {
                    setMessage({ type: 'error', text: __("select.payment.method") });
                }
            },
            isReady 
        });
    }, [isReady, paymentMethod]);

    return {
        paymentMethods,
        isFetchingPaymentMethods,
        handlePaymentMethodSelect,
        paymentMethod,
        isSubmitting,
        message
    }
}