import { useEffect, useCallback, useState, useMemo } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';
import { useDispatch, useSelector } from 'react-redux';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { cartInit, clearCartData, removeItemFromCart } from 'Store/actions/cart';
import { useLink } from 'Talons/Link/useLink';
import { submitCartComment } from 'Store/actions/cart';

export const useCheckout = (props) => {
    const history = useHistory();
    const { __ } = useTranslations();
    const state = useSelector(state => state);
    const { details: cart, isFetchingCart } = useSelector(state => state.cart);
    const { isSignedIn, token } = useSelector(state => state.auth);
    const { currentShopId, currentLanguage } = useSelector(state => state.shop);
    const [checkoutItems, setCheckoutItems] = useState({});
    const [activeStep, setActiveStep] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // We can't call the button click of the payment methods, that's why
    // we will submit them with props-to-children technique
    const [shouldSubmitPayment, setShouldSubmitPayment] = useState(false);
    const [isStepSubmittionTriggered, setIsStepSubmittionTriggered] = useState(false);
    const [signInSignUp, setIssignInSignUp] = useState('');
    const [comment, setComment] = useState("");
    const [guestInfo, setGuestInfo] = useState("");
    const [isBackToShipping, setIsBackToShipping] = useState(false);
    const { getLocalizedUrl } = useLink();

    // This function will allow children to add checkout items, specifing
    // their step, a function to submit, etc...
    const registerCheckoutItem = useCallback((item) => {
        // if (checkoutItems.find(({ id }) => id == item.id)) return;
        setCheckoutItems((currentValue) => {
            return {
                ...currentValue,
                [item.id]: item
            };
        });
    }, [checkoutItems]);

    // This will extract step info from checkout items
    const checkoutSteps = useMemo(() => {
        let stepInfo = {};
        for (const itemId in checkoutItems) {
            const item = checkoutItems[itemId];
            if (item.step && item.step.id) {
                stepInfo[item.step.id] = item.step;
            }
        }
        return stepInfo;
    }, [checkoutItems]);

    const closeModal = () => {
        setIssignInSignUp("")
    }

    const showSignInSignUp = (element) => {
        setIssignInSignUp(element);
    }

    const openSuccessModal = () => {
        setIsOpenSuccessModal(true);
    }

    const closeSuccessModal = useCallback(() => {
        setIsOpenSuccessModal(false);
        isSignedIn ? history.replace(getLocalizedUrl("/account/orders")) : history.replace("/");
    }, [isSignedIn])

    useEffect(() => {
        // Auto select the first step
        if (Object.values(checkoutSteps).length && !activeStep) {
            setActiveStep(Object.values(checkoutSteps)[0].id);
        }
    }, [checkoutSteps]);

    // Determine if the active step is the last step
    const isLastStep = useMemo(() => {
        const stepIds = Object.values(checkoutSteps).map(step => step.id);
        return activeStep == stepIds[stepIds.length - 1];
    }, [checkoutSteps, activeStep]);

    // This will be used for example when customer clicks on already passed steps
    const handleChangeActiveStep = useCallback((stepId) => {
        let allReady = true;
        for(const type in checkoutItems) {
            if(activeStep === stepId) {
                return;
            }
            else
            if(stepId === 'shipping') {
                setIsBackToShipping(true);
                if(checkoutItems[type].step.id === stepId) {
                    if(!checkoutItems[type].isReady) {
                        allReady = false;
                    }
                }
            }
            else
            if(checkoutItems[type].step.id === activeStep) {
                console.log('type', checkoutItems[type])
                if(!checkoutItems[type].isReady) {
                    allReady = false;
                }
            }
        }
        if(allReady) {
            setActiveStep(stepId);
        }
    }, [checkoutItems, activeStep]);

    const handleRemoveItem = useCallback((itemId) => {
        dispatch(removeItemFromCart(itemId));
    }, [removeItemFromCart]);

    const dispatch = useDispatch();

    const handleSubmitStep = useCallback(async () => {
        setIsStepSubmittionTriggered(true);
        // Trigger validations and submit of all component of this step. We don't wait for them, we will
        // wait until they call registerCheckoutItem with isReady = true.
        for (const type in checkoutItems) {
            if (!checkoutSteps || checkoutItems[type].step.id == activeStep) {
                await checkoutItems[type].submit();
            }
        }
    }, [checkoutSteps]);

    useEffect(() => {
        if (!activeStep || !isStepSubmittionTriggered) return;
        let allReady = true;
        let allFinishedSubmitting = true;
        for (const type in checkoutItems) {
            if (!checkoutSteps || checkoutItems[type].step.id == activeStep) {
                if (checkoutItems[type].isSubmitting) {
                    allFinishedSubmitting = false;
                    break;
                }
                if (!checkoutItems[type].isReady) {
                    allReady = false;
                    break;
                }
            }
        }

        if (!allFinishedSubmitting) {
            return;
        }

        // If all items in this steps are ready, go to the next step
        if (allReady) {
            const stepIds = Object.values(checkoutSteps).map(step => step.id);
            const currentStepIndex = stepIds.indexOf(activeStep);
            if (currentStepIndex + 1 == stepIds.length) {
                // If there are not next steps, submit the order
                setShouldSubmitPayment(true);
            } else {
                const nextStep = stepIds[currentStepIndex + 1];
                setActiveStep(nextStep);
            }
        }
        if(activeStep === "shipping" && !isSignedIn) {
            return;
        } else {
            setIsStepSubmittionTriggered(false);
        }
    }, [checkoutItems, activeStep, isStepSubmittionTriggered, isSignedIn]);

    const handleSubmitOrder = useCallback(async (params = {}) => {
        const { clearCart = true } = params;
        setIsSubmitting(true);
        await dispatch(submitCartComment(comment));
        const SUBMIT_ORDER = gql`
            mutation submitOrder($cartId: String!) {
                submitOrder(cartId: $cartId) {
                    orderId
                    orderNumber
                    grandTotal
                }
            }
        `;
        const apolloClient = getApolloClient(state);
        try {
            setErrorMessage("")
            const { data } = await apolloClient.mutate({
                mutation: SUBMIT_ORDER,
                variables: {
                    cartId: cart.id
                }
            });
            const { submitOrder: orderData } = data;
            setShouldSubmitPayment(false);
            if (clearCart) {
                dispatch(clearCartData())
            }
            setIsSubmitting(false);
            
            return orderData;
        } catch (error) {
            setShouldSubmitPayment(false);
            setIsSubmitting(false);
            if (error.message == "PlaceOrderError") {
                setErrorMessage("Can\'t place order now")
            }
        }
        
    }, [history, cart, currentShopId, setErrorMessage, comment, setComment]);


    // Set first's shop as current one if not set yet
    useEffect(() => {
        if (currentShopId) {
            dispatch(cartInit());
        }
    }, [currentShopId]);
    
    return {
        cart,
        handleRemoveItem,
        handleSubmitStep,
        handleSubmitOrder,
        isFetchingCart,
        registerCheckoutItem,
        isSignedIn,
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
    }
}