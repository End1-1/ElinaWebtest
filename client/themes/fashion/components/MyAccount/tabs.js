import React from 'react';
import classes from './tabs.module.css';
import Link from 'Components/Link';
import Icon from 'Components/Icon';
import { useAuthBar } from 'Talons/AuthBar/useAuthBar';

const Tabs  = props => {
    const { active } = props;

    const {
        handleSignOut,
        __
    } = useAuthBar({
        redirectPath: '/'
    });

    return (
        <div className={classes.root}>
            <ul className={classes.tabs}>
                <li>
                    <Link to={'/account/dashboard'} className={`${classes.link} ${active == 'dashboard' ? classes.active : ''}`}>
                        {__('Dashboard')}
                    </Link>
                </li>
                <li>
                    <Link to={'/account'} className={`${classes.link} ${active == 'account' ? classes.active : ''}`}>
                        {__('My Account')}
                    </Link>
                </li>
                <li>
                    <Link to={'/account/addresses'} className={`${classes.link} ${active == 'addresses' ? classes.active : ''}`}>
                        {__('my.addresses.account.tab')}
                    </Link>
                </li>
                <li>
                    <Link to={'/account/orders'} className={`${classes.link} ${active == 'orders' ? classes.active : ''}`}>
                        {__('my.orders.account.tab')}
                    </Link>
                </li>
                <li>
                    <Link to={'/account/subscriptions'} className={`${classes.link} ${active == 'subscriptions' ? classes.active : ''}`}>
                        {__('subscriptions')}
                    </Link>
                </li>
                <li>
                    <span className={`${classes.link} ${classes.signOutLink}`} onClick={handleSignOut}>
                        <Icon name="logout" />
                        {__('Logout')}
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default Tabs;