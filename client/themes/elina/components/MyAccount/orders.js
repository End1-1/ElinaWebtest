import React, {Fragment} from 'react';
import defaultClasses from './orders.module.css';
import Tabs from './tabs';
import {mergeClasses} from 'Helper/classify';
import {useOrders} from 'Talons/Account/useOrders';
import Pagination from 'Components/Toolbar/pagination';
import OrderModal from './orderModal';
import {usePrice} from 'Talons/Price/usePrice';
import useWindowSize from "../../../../hooks/useWindowSize";

const Orders = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()
    const {
        orders,
        pageControl,
        formateDate,
        openModal,
        setOpenModal,
        activeOrderId,
        setActiveOrderId,
        __
    } = useOrders();
    const { 
        currencyValue
    } = usePrice();
    console.log(orders)

    if(width <= 900) {
        return (
            <div className={classes.root}>
                {width >= 800 && <Tabs active={'orders'} classes={{root: classes.tabs}}/>}
                { activeOrderId ? <OrderModal open={openModal} onClose={() => setOpenModal(false)} orderId={activeOrderId}/> : null }
                <div className={classes.content}>
                    {orders.length ?
                        <Fragment>
                            <h3 className={classes.title}>{__('my.orders.heading')}</h3>
                            <div className={classes.orders}>
                                    <div className={classes.tableMobile}>
                                        {orders.map((order, i) =>
                                            <div className={classes.tableHeader}>
                                                <div className={classes.orderTableRow}>
                                                    <span className={classes.mobileTableHeader}>{__('my.orders.table.column.id')}</span>
                                                    <span className={classes.tableText}>{order.orderNumber}</span>
                                                </div>
                                                <div className={classes.orderTableRow}>
                                                    <span className={classes.mobileTableHeader}>{__('my.orders.table.column.date')}</span>
                                                    <span className={classes.tableText}>{formateDate(order.createdAt)}</span>
                                                </div>
                                                <div className={classes.orderTableRow}>
                                                    <span className={classes.mobileTableHeader}>{__('payment')}</span>
                                                    <span className={classes.tableText}>{order.paymentMethod && order.paymentMethod.methodName}</span>
                                                </div>
                                                <div className={classes.orderTableRow}>
                                                    <span className={classes.mobileTableHeader}>{__('my.orders.table.column.status')}</span>
                                                    <span className={classes.tableText}>{order.orderStatus ? order.orderStatus.status : null}</span>
                                                </div>
                                                <div className={classes.orderTableRow}>
                                                    <span className={classes.mobileTableHeader}>{__('my.orders.table.column.total')}</span>
                                                    <span className={classes.tableText}>{order.grandTotal} {currencyValue}</span>
                                                </div>
                                                <span className={classes.link} onClick={() => {setActiveOrderId(order.id); setOpenModal(true)}}>
                                                    {__('my.orders.order.view')}
                                                       </span>
                                            </div>
                                        )}

                                    </div>
                                {/*</table>*/}
                                <Pagination pageControl={pageControl} />
                            </div>
                        </Fragment>
                    : 
                        <h3 className={classes.title}>{__("no.orders.yet")}</h3>}
                </div>
            </div>
        )
    }
    return (
        <div className={classes.root}>
            <Tabs active={'orders'} classes={{root:classes.tabs}} />
            { activeOrderId ? <OrderModal open={openModal} onClose={() => setOpenModal(false)} orderId={activeOrderId}/> : null }
            <div className={classes.content}>
                {orders.length ? 
                    <Fragment>
                        <h3 className={classes.title}>{__('my.orders.heading')}</h3>
                        <div className={classes.orders}>
                            <div className={classes.tableField}>
                                <div className={classes.table}>
                                    <div className={`${classes.row} ${classes.header}`}>
                                        <div  className={classes.headerTitle}>{__('my.orders.table.column.id')}</div>
                                        <div  className={classes.headerTitle}>{__('my.orders.table.column.date')}</div>
                                        <div  className={classes.headerTitle}>{__('payment')}</div>
                                        <div  className={classes.headerTitle}>{__('my.orders.table.column.status')}</div>
                                        <div  className={classes.headerTitle}>{__('my.orders.table.column.total')}</div>
                                    </div>
                                    {orders.map((order, i) =>
                                        <Fragment>
                                        <div className={classes.row} key={order.id}>

                                            <div className={classes.cell}>{order.orderNumber}</div>
                                            <div className={classes.cell}>{formateDate(order.createdAt)}</div>
                                            <div className={classes.cell}>{order.paymentMethod && order.paymentMethod.methodName}</div>
                                            <div className={classes.cell}>{order.orderStatus ? order.orderStatus.status : null}</div>
                                            <div className={classes.cell}>{order.grandTotal} {currencyValue}</div>

                                        </div>
                                            <div className={classes.linkField}>
                                                <span className={classes.link} onClick={() => {setActiveOrderId(order.id); setOpenModal(true)}}>
                                    {__('my.orders.order.view')}
                                        </span>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                                <Pagination pageControl={pageControl} />
                        </div>
                    </Fragment> 
                : 
                    <h3 className={classes.title}>{__("no.orders.yet")}</h3>}
            </div>
        </div>
    );
}

export default Orders;


