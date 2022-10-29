import React from 'react';
import defaultClasses from './order.module.css';
import Tabs from 'Components/MyAccount/tabs';
import { mergeClasses } from 'Helper/classify';
import { useOrder } from 'Talons/Account/useOrder';
import Totals from 'Components/MyAccount/order/totals';
import AddressCard from 'Components/AddressCard';
import Link from 'Components/Link';

const Order  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        order,
        isFetched,
        __
    } = useOrder(props);

    if (!isFetched) {
        return null;
    }

    return (
        <div className={classes.root}>
            <h3 className={classes.headline}><span>{__('my.order.items.heading')}</span></h3>
            <div className={classes.container}>
                <Tabs active={'orders'} />
                <div className={classes.content}>
                    <div className={classes.orders}>
                        <h4>Order #{order.id}</h4>
                        <p>Placed on {new Date(Number(order.createdAt)).toLocaleString()}</p>
                        <p>{__('order.status')}: {__(`order.status.${order.orderStatus.status}`)}</p>
                        <p>{__('order.payment.status')}: {__(`order.payment.status.${order.paymentStatus.status}`)}</p>
                        <p>{__('order.fulfillment.status')}: {__(`order.fulfillment.status.${order.fulfillmentStatus.status}`)}</p>
                        <div className={classes.items}>
                            <table>
                                <thead>
                                <tr>
                                    <th>{__('my.order.item.name')}</th>
                                    <th>{__('my.order.item.sku')}</th>
                                    <th>{__('my.order.item.price')}</th>
                                    <th>{__('my.order.item.quantity')}</th>
                                    <th>{__('my.order.item.line.total')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.items.map(item =>
                                    <tr key={item.id} className={classes.order}>
                                        <td data-th={__('my.order.item.name')}>{item.name}</td>
                                        <td data-th={__('my.order.item.sku')}>{item.sku}</td>
                                        <td className={classes.total} data-th={__('my.order.item.price')}>{item.price}</td>
                                        <td data-th={__('my.order.item.quantity')}>{item.quantity}</td>
                                        <td data-th={__('my.order.item.line.total')}>{item.quantity * item.price}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <Totals order={order} />
                        </div>
                        <h3 className={classes.heading}>{__('my.order.information')}</h3>
                        <div className={classes.details}>
                            <div>
                                <h4>{__('my.order.shipping.address')}</h4>
                                <AddressCard address={order.shippingAddress} />
                            </div>
                            <div>
                                <h4>{__('my.order.shipping.method')}</h4>
                                {order.shippingMethod ? `${order.shippingMethod.carrierName} ${order.shippingMethod.price}` : <span>No info found</span>}
                            </div>
                            <div>
                                <h4>{__('my.order.billing.address')}</h4>
                                <AddressCard address={order.billingAddress} />
                            </div>
                            <div>
                                <h4>{__('my.order.billing.method')}</h4>
                                <span>{order.paymentMethod.methodName}</span>
                            </div>
                        </div>
                    </div>
                    <Link to={'/account/orders'}>{__('my.order.go.back')}</Link>
                </div>
            </div>

        </div>
    );
}

export default Order;