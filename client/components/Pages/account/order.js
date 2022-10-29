import React from 'react';
import classes from '../page.module.css';
import OrderComponent from 'Components/MyAccount/order';
import { useSelector } from "react-redux";
import isObjectEmpty from 'Helper/isObjectEmpty';
import Head from '../../Head';
import { useTranslations } from 'Talons/App/useTranslations';
import { useParams } from 'react-router-dom';

const Order = (props) => {
    const { __ } = useTranslations();
    const { id } = useParams();

    const { currentUser } = useSelector(state => state.auth);

    return (
        <div>
            <Head>
                <title>{__('My Orders')}</title>
            </Head>
            <div className={classes.body}>
                {!isObjectEmpty(currentUser) ? <OrderComponent id={id} currentUser={currentUser} /> : null}
            </div>
        </div>
    );
}

export default Order;