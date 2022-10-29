import React  from 'react';
import { usePlaceOrderIdram } from 'Talons/PaymentIdram/usePlaceOrderIdram';

const PlaceOrderIdram = props => {
    const { handleOriginalPlaceOrder, shouldSubmitPayment, orderData, setOrderData } = props;

    const {
        merchantAccountId,
        mode,
        form,
        successPath
    } = usePlaceOrderIdram({
        handleOriginalPlaceOrder,
        shouldSubmitPayment,
        setOrderData
    });

    // We don't have a button to submit this, because checkout will make
    // shouldSubmitPayment = true and it will auto-submit. The other apprech
    // was to show the button for each method (like in magento), but changed to
    // this one
    
    return (
        <div>
            {
                orderData 
                ?   <form action="https://money.idram.am/payment.aspx" method="POST" ref={form} id="idramForm">
                        <input type="hidden" name="EDP_LANGUAGE" value="EN" />
                        <input type="hidden" name="EDP_REC_ACCOUNT" value={merchantAccountId} />
                        <input type="hidden" name="EDP_DESCRIPTION" value="Order description" />
                        <input type="hidden" name="EDP_AMOUNT" value={mode == 'test' ? 1 : orderData.grandTotal} />
                        <input type="hidden" name="EDP_BILL_NO" id="justToCheck" value={orderData.orderId} />
                        <input type="hidden" name="SHOPIAN_SUCCESS_PATH" value={successPath}></input>
                    </form>
                :   null
            }
        </div>
    );
}

export default PlaceOrderIdram;