import React from 'react';
import { useSelector } from "react-redux";
import classes from 'Components/MyAccount/dashboard.module.css';
import { useTranslations } from 'Talons/App/useTranslations';
import Tabs from 'Components/MyAccount/tabs';
import Link from 'Components/Link';
import LatestOrders from 'Components/MyAccount/latestOrders';

const Dashboard  = props => {
    const { currentUser } = useSelector(state => state.auth);
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <h3>{__('Dashboard')}</h3>
            <div className={classes.container}>
                <Tabs active={'dashboard'} />
                <div className={classes.content}>
                    <div className={classes.customerInfo}>
                        <p className={classes.name}>{__('Hello')} {currentUser.firstName}</p>
                        <p className={classes.email}>{currentUser.email}</p>
                        <Link to={'/account'}>{__('edit')}</Link>
                        <span className={classes.separator}>|</span>
                        <Link to={'/account'}>{__('Change Password')}</Link>
                    </div>
                    <div className={classes.addressesInfo}>
                        <div className={classes.billing}>
                            <h3 className={classes.title}>{__('default.billing.address')}</h3>
                            <Link to={'/account/addresses'}>{__('edit')}</Link>
                        </div>
                        <div className={classes.shipping}>
                            <h3 className={classes.title}>{__('default.shipping.address')}</h3>
                            <Link to={'/account/addresses'}>{__('edit')}</Link>
                        </div>
                    </div>
                    <LatestOrders />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;