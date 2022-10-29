import React from 'react';
import { useSubscribe } from 'Talons/ProductContent/useSubscribe';
import Button from 'Components/Button';
import Message from 'Components/Message';
import classes from './subscribe.module.css';
import SubscribeForm from './subscribeForm';
import SignedInSubscribeForm from './signedInSubscribeForm';

const Subscribe = (props) => {
    const { productId, variantId } = props;
    const talonProps = useSubscribe({ productId, variantId });
    const { 
        isSignedIn, 
        whoCanSubscribe,
        message,
        formik,
        currentUser,
        letCustomerSubscriptionViaAnotherEmailOrPhone
    } = talonProps;
    return (
        <div className={classes.root}>
            {
                message
                ?   <div className={classes.message}>
                        {message}
                    </div> 
                :   null
            }
            {
              isSignedIn 
                ?  <SignedInSubscribeForm 
                        formik={formik} 
                        letCustomerSubscriptionViaAnotherEmailOrPhone={letCustomerSubscriptionViaAnotherEmailOrPhone}
                    />
                :   <SubscribeForm formik={formik}/>
            }
        </div>
    )
}

export default Subscribe;