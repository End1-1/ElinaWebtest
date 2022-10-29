import React, { useState, useEffect } from 'react';
import defaultClasses from './paymentMethods.module.css';
import { usePaymentMethods } from 'Talons/PaymentMethods/usePaymentMethods';
import { useTranslations } from 'Talons/App/useTranslations';
import { mergeClasses } from 'Helper/classify';
import Radio from 'Components/Radio';
import visaCard from './visaCard.png';
import masterCard from './masterCard.png';
import iDram from './idram.png';
import Message from 'Components/Message';

const updatedMethods = (paymentMethods) => {
    const updated = paymentMethods.map(method => {
        if(method.methodCode === "ameriaBank") {
            return {
                ...method,
                icon: <div>
                    <img src={visaCard} /> 
                    <img src={masterCard} /> 
                </div>
            }
        }
        else if(method.methodCode === "idram") {
            return {
                ...method,
                icon: <img src={iDram} /> 
            }
        }
        else {
            return method;
        }
    });
    return updated
}
const PaymentMethods  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { 
        paymentMethods,
        isFetchingPaymentMethods,
        handlePaymentMethodSelect,
        paymentMethod,
        isSubmitting,
        message
    } =  usePaymentMethods(props);

    
    const { __ } = useTranslations();

    if (!paymentMethods.length) {
        return null;
    }

    return (
        <div className={classes.root}>
            <h4 className={classes.title}>{__('payment.method')}</h4>
            {!paymentMethods.length && <p>{__('no.payments.found')}</p>}
            <div className={classes.methods}>
                {paymentMethods.length && updatedMethods(paymentMethods).map(method =>
                    <div className={classes.method} key={method.methodCode} >
                         <div className={classes.radioDiv}>
                            <Radio
                                elements={[{ label: method.icon ? method.icon : <p>{method.methodName}</p>, value: true }]}
                                value={paymentMethod && paymentMethod.methodCode == method.methodCode}
                                classes={{ radioLabel: classes.radioLabel, radio: classes.radio, checkmarkWrapper: classes.radioWrapper }}
                                onChange={() => handlePaymentMethodSelect({ methodCode: method.methodCode })}
                            />
                        </div>
                      {paymentMethod && paymentMethod.methodCode == "telcell" && method.methodCode == "telcell" &&
                        <div className={classes.message}>
                          <p>Պատվերի վերջնական հաստատման համար խնդրում ենք կատարել գումարի փոխանցումը , նկարել կտրոնը և
                            ուղարկել ՝ +37433111777 <a style={{ color: "blue", ":hover": "text-decoration:underLine" }}
                                                       href="viber://chat?number=%37433111777">Viber</a>/:&nbsp;<a
                              style={{ color: "blue", ":hover": "text-decoration:underLine" }}
                              href="https://wa.me/37433111777">WhatsApp</a>/&nbsp; <a
                              style={{ color: "blue", ":hover": "text-decoration:underLine" }}
                              href="https://telegram.me/elinaarmenia">Telegram</a></p>
                          <br/>
                          <p>Փոխանցման տվյալներ՝</p>
                          <p>▪️ Ameria Bank</p>
                          <p>▪️Հաշվեհամար:&nbsp;1570073302670200</p><br/>
                          <p>Ստացող` ELINA1 LLC</p>
                        </div>}
                    </div>
                )}
            </div>
            {message.text && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
        </div>
    );
}

export default PaymentMethods;