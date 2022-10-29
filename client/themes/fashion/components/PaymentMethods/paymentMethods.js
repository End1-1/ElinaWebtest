import React from 'react';
import defaultClasses from './paymentMethods.module.css';
import { usePaymentMethods } from 'Talons/PaymentMethods/usePaymentMethods';
import { useTranslations } from 'Talons/App/useTranslations';
import { mergeClasses } from 'Helper/classify';

const PaymentMethods  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { 
        paymentMethods,
        isFetchingPaymentMethods,
        handlePaymentMethodSelect,
        paymentMethod,
        isSubmitting
    } =  usePaymentMethods();
    
    const { __ } = useTranslations();

    if (isFetchingPaymentMethods) {
        return null;
    }
    
    return (
        <div className={classes.root}>
            <h4 className={classes.heading}>{__('payment.method')}</h4>
            {!paymentMethods.length && <p>{__('No payments methods found')}</p>}
            <div className={classes.methods}>
                <table>
                    <tbody>
                        {paymentMethods.map(method => 
                            <tr className={classes.method} key={method.methodCode} onClick={() => handlePaymentMethodSelect({ methodCode: method.methodCode })}>
                                <td>
                                    <span 
                                        className={`${classes.checkbox} ${paymentMethod && paymentMethod.methodCode == method.methodCode ? classes.selected : ''}`} 
                                    />
                                    {method.methodName}
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaymentMethods;