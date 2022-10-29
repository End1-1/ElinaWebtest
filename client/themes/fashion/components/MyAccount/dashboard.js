import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUserDetails } from 'Store/actions/auth';
import classes from './dashboard.module.css';
import { useTranslations } from 'Talons/App/useTranslations';
import Tabs from './tabs';
import Link from 'Components/Link';
import AddressCard from 'Components/AddressCard';
import LatestOrders from 'Components/MyAccount/latestOrders';

const Dashboard  = props => {
    const [message, setMessage] = useState({});
    const { currentUser } = useSelector(state => state.auth);
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <h3 className={classes.headline}><span>{__('Dashboard')}</span></h3>
            <div className={classes.container}>
                <Tabs active={'dashboard'} />
                <div className={classes.content}>
                    <div className={classes.customerInfo}>
                        <p className={classes.name}>{__('Hello')}, {currentUser.firstName}</p>
                        <div className={classes.info}>
                            <p className={classes.name}>{currentUser.firstName}</p>
                            <p className={classes.email}>{currentUser.email}</p>
                        </div>
                        <Link to={'/account'}>{__('edit')}</Link>
                        <span className={classes.separator}>|</span>
                        <Link to={'/account'}>{__('Change Password')}</Link>
                    </div>
                    <div className={classes.addressesInfo}>
                        <div className={classes.billing}>
                            <h3 className={classes.title}>
                                <span className={'bluTitle'}>{__('default.billing.address')}</span>
                            </h3>
                            {currentUser.addresses.find(address => address.isDefaultBilling) ?
                                <AddressCard address={currentUser.addresses.find(address => address.isDefaultBilling)} />
                                : <span>{__('You have not set a default billing address.')}</span>
                            }
                            <Link to={'/account/addresses'}>{__('edit')}</Link>
                        </div>
                        <div className={classes.shipping}>
                            <h3 className={classes.title}>
                                <span className={'bluTitle'}>{__('default.shipping.address')}</span>
                            </h3>
                            {currentUser.addresses.find(address => address.isDefaultShipping) ? <AddressCard
                                address={currentUser.addresses.find(address => address.isDefaultShipping)}
                            /> : <span>{__('You have not set a default shipping address.')}</span>}
                            <Link to={'/account/addresses'}>{__('edit')}</Link>
                        </div>
                    </div>
                    <LatestOrders classes={{root: classes.latestOrder}}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;