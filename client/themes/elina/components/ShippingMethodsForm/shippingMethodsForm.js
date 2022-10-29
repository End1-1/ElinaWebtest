import React from 'react';
import defaultClasses from './shippingMethodsForm.module.css';
import {useShippingMethodsForm} from 'Talons/ShippingMethodsForm/useShippingMethodsForm';
import {useTranslations} from 'Talons/App/useTranslations';
import Price from 'Components/Price';
import Message from 'Components/Message';
import {mergeClasses} from 'Helper/classify';
import Radio from 'Components/Radio';
import useWindowSize from "../../../../hooks/useWindowSize";

const ShippingMethodsForm = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()
    const {
        shippingMethods,
        isFetchingShippingMethods,
        handleShippingMethodSelect,
        shippingMethod,
        message,
        isSubmitting
    } = useShippingMethodsForm({
        ...props
    });
    const {__} = useTranslations();

    if (isFetchingShippingMethods) {
        return null;
    }

    return (
        <div className={classes.root}>
            <h3 className={classes.title}>{__('shipping.method')}</h3>
            {!shippingMethods.length && <p>{__('no.shipping.methods.found')}</p>}
            {shippingMethods.map(method =>
                <div className={classes.carrier} key={method.carrierCode}>
                    {shippingMethods.length > 1 &&
                    <span className={classes.carrierName}>{method.carrierName}</span>}
                        <table className={classes.table}>
                            <tbody>
                        {method.rates.map((rate, index) =>
                            <tr className={classes.rate} key={rate.id}>
                              <td className={classes.rateRow}>
                                <div>
                                    <Radio
                                        elements={[{label: rate.name, value: true}]}
                                        value={shippingMethod && shippingMethod.carrierCode == method.carrierCode && shippingMethod.rateId == rate.id}
                                        classes={{
                                            radioLabel: classes.radioLabel,
                                            radio: classes.radio,
                                            checkmarkWrapper: classes.radioWrapper
                                        }}
                                        onChange={() => handleShippingMethodSelect({
                                            carrierCode: method.carrierCode,
                                            rateId: parseInt(rate.id),
                                            rateName: rate.name
                                        })}
                                    />
                                </div>
                              </td>
                                <td className={classes.row} >
                                <div className={classes.priceBox}>
                                    {rate.price === 0
                                        ?
                                        <span>{__("free")}<span className={classes.asterisk}>*</span></span>
                                        :
                                        <Price amount={rate.price}/>
                                    }
                                </div>
                                </td>
                                <td className={classes.rowDescription}>
                                <div className={classes.desc}>{rate.description}</div>
                                </td>
                            </tr>

                        )}
                            </tbody>
                        </table>
                </div>
            )}
            {message && <Message containerClass={classes.message} type={message.type}>{message.text}</Message>}
        </div>
    );
}

export default ShippingMethodsForm;