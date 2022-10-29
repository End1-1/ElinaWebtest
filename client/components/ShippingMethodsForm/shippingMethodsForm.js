import React from 'react';
import defaultClasses from './shippingMethodsForm.module.css';
import { useShippingMethodsForm } from 'Talons/ShippingMethodsForm/useShippingMethodsForm';
import { useTranslations } from 'Talons/App/useTranslations';
import Price from 'Components/Price';
import Message from 'Components/Message';
import { mergeClasses } from 'Helper/classify';

const ShippingMethodsForm  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { 
        shippingMethods,
        isFetchingShippingMethods,
        handleShippingMethodSelect,
        shippingMethod,
        message,
        isSubmitting
    } =  useShippingMethodsForm({
        ...props
    });
    
    const { __ } = useTranslations();

    if (isFetchingShippingMethods) {
        return null;
    }
    

    return (
        <div className={classes.root}>
            <h4>{__('shipping.method')}</h4>
            {!shippingMethods.length && <p>{__('No shipping methods found')}</p>}
            {shippingMethods.map(method =>
                <div className={classes.carrier} key={method.carrierCode}>
                    {shippingMethods.length > 1 && <span className={classes.carrierName}>{method.carrierName}</span>}
                    <div className={classes.rates}>
                        <table>
                            <tbody>
                                {method.rates.map(rate => 
                                    <tr className={classes.rate} key={rate.id} onClick={() => handleShippingMethodSelect({ carrierCode: method.carrierCode, rateId: parseInt(rate.id) })}>
                                        <td>
                                            <span 
                                                className={`${classes.checkbox} ${shippingMethod && shippingMethod.carrierCode == method.carrierCode && shippingMethod.rateId == rate.id ? classes.selected : ''}`} 
                                            />
                                            {rate.name}
                                        </td>
                                        <td>{rate.description}</td>
                                        <td><Price amount={rate.price} /></td>
                                    </tr>    
                                )}
                            </tbody>
                        </table>
                    </div>
                </div> 
            )}
            {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
        </div>
    );
}

export default ShippingMethodsForm;