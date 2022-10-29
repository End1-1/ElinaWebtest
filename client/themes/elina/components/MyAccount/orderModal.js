import React, { useEffect } from 'react';
import defaultClasses from './orderModal.module.css';
import {mergeClasses} from 'Helper/classify'
import Modal from "Components/Modal";
import {useOrder} from 'Talons/Account/useOrder';
import OrderProduct from './orderProduct';
import {usePrice} from 'Talons/Price/usePrice';
import useWindowSize from "../../../../hooks/useWindowSize";

const OrderModal = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {orderId, onClose, open} = props;
    const {width} = useWindowSize()
    const {
        order,
        addressOrder,
        __
    } = useOrder({id: orderId});
    const {
        currencyValue
    } = usePrice();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        }
        return () => document.body.style.overflow = 'auto'
    }, [open]);

    if (!order) {
        return null
    }
    return (
        <Modal open={open} onClose={onClose} classes={{content: classes.modalContent, closeIconField: classes.closeIconField}}>
            <div className={classes.root}>
                <div className={classes.titleField}>
                    <span className={classes.title}>
                        {__("order.details")}
                    </span>
                </div>
                <div className={classes.orderStatusfield}>
                    <div>
                        <div className={classes.textField}>
                            <span className={classes.orderNumberText}>
                               {__("account.order.number")} 
                            </span>
                            <span className={classes.orderNumber}>
                                {order.orderNumber}
                            </span>
                        </div>
                        <div className={classes.textField}>
                            <span className={classes.orderNumberText}>
                                {__("order.status")}
                            </span>
                            <span className={classes.orderNumber}>
                                {order.orderStatus ? order.orderStatus.status : null}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.detailsHeader}>
                    <div className={classes.detailsText}>
                        {__("details")}
                    </div>
                    {width > 700 && <div className={classes.detailsPriceText}>
                        {__("price")}
                    </div>}
                </div>
                <div className={classes.items}>
                    {
                        order.items && order.items.map((e, i) => {
                            return (
                                <OrderProduct product={e} key={i} currencyValue={currencyValue}/>
                            )
                        })
                    }
                </div>
                <div className={classes.addressContent}>
                    <div className={classes.addressField}>
                        <div className={classes.shippingAddress}>
                            <span className={classes.addressText}>
                                {__("shipping.address")}
                            </span>
                            <span className={classes.addressValue}>
                                {addressOrder}
                            </span>
                        </div>
                    </div>
                    <div className={classes.addressField}>
                        <div className={classes.shippingMethod}>
                            <span className={classes.addressText}>
                                {__("shipping.method")}
                            </span>
                            {
                                order.shippingMethod.price 
                                ?   <span className={classes.addressValue}>
                                        {order.shippingMethod.price} {currencyValue}
                                    </span>
                                :   null
                            }
                            <span className={classes.addressValue}>
                                {order.shippingMethod.rateName}
                            </span>
                        </div>
                    </div>
                    <div className={classes.addressField}>
                        <div className={classes.paymentMethod}>
                            <span className={classes.addressText}>
                                {__("payment.method")}
                            </span>
                            <span className={classes.addressValue}>
                                {order.paymentMethod && order.paymentMethod.methodName}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.totalField}>
                    <span className={classes.totalValue}>
                        {__("my.orders.table.column.total")}
                    </span>
                    <span className={classes.totalValue}>
                        {order.grandTotal} {currencyValue}
                    </span>
                </div>
            </div>
        </Modal>
    )
}
export default OrderModal;