import React from 'react';
import defaultClasses from 'Components/MyAccount/orders.module.css';
import Tabs from 'Components/MyAccount/tabs';
import { mergeClasses } from 'Helper/classify';
import { useOrders } from 'Talons/Account/useOrders';
import Link from 'Components/Link';
import Pagination from 'Components/Toolbar/pagination';

const Orders  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        orders,
        pageControl,
        __
    } = useOrders();

    return (
        <div className={classes.root}>
            <Tabs active={'orders'} />
            <div className={classes.content}>
                <h3>{__('my.orders.heading')}</h3>
                <div className={classes.orders}>
                    {!orders.length && <p className={classes.empty}>{__('order.list.is.empty')}</p>}
                    {!!orders.length && <div className={classes.orders}>
                        <table>
                            <thead>
                                <tr>
                                    <th>{__('my.orders.table.column.id')}</th>
                                    <th>{__('my.orders.table.column.date')}</th>
                                    <th>{__('my.orders.table.column.shipping')}</th>
                                    <th>{__('my.orders.table.column.total')}</th>
                                    <th>{__('my.orders.table.column.status')}</th>
                                    <th>{__('order.payment.status')}</th>
                                    <th>{__('order.fulfillment.status')}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => 
                                <tr key={order.id} className={classes.order}>
                                    <td>{order.id}</td>
                                    <td>{new Date(Number(order.createdAt)).toLocaleString()}</td>
                                    <td>
                                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                    </td>
                                    <td>{order.grandTotal}</td>
                                    <td data-th={__('my.orders.table.column.status')}>{order.orderStatus ? __(`order.status.${order.orderStatus.status}`) : ''}</td>
                                    <td data-th={__('my.orders.table.column.status')}>{order.paymentStatus ? __(`order.payment.status.${order.paymentStatus.status}`) : ''}</td>
                                    <td data-th={__('my.orders.table.column.status')}>{order.fulfillmentStatus ? __(`order.fulfillment.status.${order.fulfillmentStatus.status}`) : ''}</td>
                                    <td>
                                        <Link to={`/account/order/${order.id}`}>{__('my.orders.order.view')}</Link>
                                    </td>
                                </tr>   
                            )}
                            </tbody>
                        </table>
                        <Pagination pageControl={pageControl} />
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Orders;