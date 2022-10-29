import React from 'react';
import defaultClasses from 'Components/MyAccount/latestOrders.module.css';
import { mergeClasses } from 'Helper/classify';
import { useOrders } from 'Talons/Account/useOrders';
import Link from 'Components/Link';

const LatestOrders  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        orders,
        __
    } = useOrders({
        type: 'latest',
        perPage: 4
    });

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <h3>{__('latest.orders')}</h3>
                <div className={classes.orders}>
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
                                <td>{order.orderStatus.status}</td>
                                <td>{order.fulfillmentStatus.status}</td>
                                <td>{order.paymentStatus.status}</td>
                                <td>
                                    <Link to={`/account/order/${order.id}`}>{__('my.orders.order.view')}</Link>
                                </td>
                            </tr>   
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LatestOrders;