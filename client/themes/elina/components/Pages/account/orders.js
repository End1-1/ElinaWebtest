import React from 'react';
import classes from '../page.module.css';
import OrdersComponent from 'Components/MyAccount/orders';
import { useSelector } from "react-redux";
import isObjectEmpty from 'Helper/isObjectEmpty';
import Head from 'Components/Head';
import { useTranslations } from 'Talons/App/useTranslations';
import GuestOrders from 'Components/MyAccount/guestOrders';

const Orders = (props) => {
    const { __ } = useTranslations();

    const { currentUser } = useSelector(state => state.auth);

    return (
        <div>
            <Head>
                <title>{__('my.orders.heading')}</title>
            </Head>
            <div className={classes.body}>
                {!isObjectEmpty(currentUser) ? <OrdersComponent currentUser={currentUser} /> : <GuestOrders/>}
            </div>
        </div>
    );
}

export default Orders;