import React from 'react';
import classes from 'Components/MyAccount/tabs.module.css';
import Link from 'Components/Link';
import {useAuthBar} from 'Talons/AuthBar/useAuthBar';

const Tabs = props => {
    const {active} = props;

    const {
        handleSignOut,
        __
    } = useAuthBar({
        redirectPath: '/'
    });

    return (
        <div className={classes.root}>
            <div className={classes.tabs}>
                <Link to={'/account/dashboard'}
                      className={`${classes.link} ${active == 'dashboard' ? classes.active : ''}`}>
                    {__('Dashboard')}
                </Link>
                <Link to={'/account'} className={`${classes.link} ${active == 'account' ? classes.active : ''}`}>
                    {__('My Account')}
                </Link>
                <Link to={'/account/orders'} className={`${classes.link} ${active == 'orders' ? classes.active : ''}`}>
                    {__('my.orders.account.tab')}
                </Link>
                <Link to={'/account/addresses'}
                      className={`${classes.link} ${active == 'addresses' ? classes.active : ''}`}>
                    {__('my.addresses.account.tab')}
                </Link>
                <span className={`${classes.link} ${classes.signOutLink}`} onClick={handleSignOut}>
                        {__('Logout')}
                    </span>
            </div>
        </div>
    );
}

export default Tabs;