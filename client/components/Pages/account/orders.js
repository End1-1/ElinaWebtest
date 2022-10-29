import React, { useEffect } from 'react';
import classes from '../page.module.css';
import OrdersComponent from 'Components/MyAccount/orders';
import { useSelector } from "react-redux";
import isObjectEmpty from 'Helper/isObjectEmpty';
import Head from '../../Head';
import { useTranslations } from 'Talons/App/useTranslations';

const Orders = (props) => {
    const { __ } = useTranslations();

    const { currentUser } = useSelector(state => state.auth);

    return (
        <div>
            <Head>
                <title>{__('My Orders')}</title>
            </Head>
            <div className={classes.body}>
                {!isObjectEmpty(currentUser) ? <OrdersComponent currentUser={currentUser} /> : null}
            </div>
        </div>
    );
}

export default Orders;