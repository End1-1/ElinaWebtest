import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShippingMethods, submitShippingMethod } from 'Store/actions/cart';
import { useTranslations } from 'Talons/App/useTranslations';
import isEmpty from 'lodash/isEmpty';

export const useShippingMethodsForm = (props) => {
    const { registerCheckoutItem } = props;
    const { shippingMethods, isFetchingShippingMethods, details, guestShippingCity } = useSelector(state => state.cart);
    const { isSignedIn } = useSelector(state => state.auth);
    const { shippingMethod, shippingAddress } = details;
    const [isReady, setIsReady] = useState(shippingMethod ? true : false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(false);
    const { __ } = useTranslations();
    
    const dispatch = useDispatch();
    const currentShopId = useSelector(state => state.shop);

    const handleShippingMethodSelect = useCallback(async (method) => {
        setIsSubmitting(true);
        await dispatch(submitShippingMethod(method));
        setIsSubmitting(false);
        setIsReady(true);
        setMessage(false);
    }, [submitShippingMethod, setIsSubmitting]);

    useEffect(() => {
        if(isSignedIn && !isEmpty(shippingAddress) && shippingAddress.city && shippingMethods.length) {
            if(shippingAddress.city === "ER") {
                if(!shippingMethod || shippingMethod.rateId !== 677) {
                    const method = shippingMethods[0];
                    handleShippingMethodSelect({
                        carrierCode: method.carrierCode, rateId: parseInt(method.rates[0].id),
                        rateName: method.rates[0].name
                    })
                }
            }
            else 
            if(!shippingMethod || shippingMethod.rateId === 677) {
                const method = shippingMethods[0];
                handleShippingMethodSelect({
                    carrierCode: method.carrierCode, rateId: parseInt(method.rates[1].id),
                    rateName: method.rates[1].name
                })
            }
        }
    }, [shippingAddress, shippingMethods, shippingMethod, isSignedIn]);

    useEffect(() => {
        if(!isSignedIn && guestShippingCity && shippingMethods.length) {
            if(guestShippingCity === "ER") {
                if(!shippingMethod || shippingMethod.rateId !== 677) {
                    const method = shippingMethods[0];
                    handleShippingMethodSelect({
                        carrierCode: method.carrierCode, rateId: parseInt(method.rates[0].id),
                        rateName: method.rates[0].name
                    });
                }
            }
            else 
            if(!shippingMethod || shippingMethod.rateId === 677) {
                const method = shippingMethods[0];
                handleShippingMethodSelect({
                    carrierCode: method.carrierCode, rateId: parseInt(method.rates[1].id),
                    rateName: method.rates[1].name
                })
            }
        }
    }, [isSignedIn, guestShippingCity, shippingMethods, shippingMethod]);

    useEffect(() => {
        if (currentShopId) {
            dispatch(fetchShippingMethods());
        }
    }, [currentShopId]);

    useEffect(() => {
        registerCheckoutItem({
            id: 'shippingMethods',
            step: {
                id: 'shipping',
                title: "shipping"
            },
            submit: () => {
                if (!shippingMethod) {
                    setMessage({ type: 'error', text: __('please.select.shipping.method') });
                }
            },
            isReady 
        });
    }, [isReady, shippingMethod]);

    return {
        shippingMethods,
        isFetchingShippingMethods,
        handleShippingMethodSelect,
        shippingMethod,
        isSubmitting,
        isReady,
        message
    }
}