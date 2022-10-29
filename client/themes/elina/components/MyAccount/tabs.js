import React from 'react';
import defaultClasses from './tabs.module.css';
import Link from 'Components/Link';
import { useAuthBar } from 'Talons/AuthBar/useAuthBar';
import { mergeClasses } from 'Helper/classify';

const Tabs  = props => {
    const { active } = props;
    const classes = mergeClasses(defaultClasses , props.classes)
    const {
        handleSignOut,
        __
    } = useAuthBar({
        redirectPath: '/'
    });

    return (
        <div className={classes.root}>
            <Link to={'/account'} classes={{link: `${classes.link} ${active == 'account' ? classes.active : ''}`}}>
                {__('my.account')}
            </Link>
            <Link to={'/account/orders'} classes={{link: `${classes.link} ${active == 'orders' ? classes.active : ''}`}}>
                {__('my.orders.account.tab')}
            </Link>
            <Link to={'/account/addresses'} classes={{link: `${classes.link} ${active == 'addresses' ? classes.active : ''}`}}>
                {__('my.addresses.account.tab')}
            </Link>
            <div className={classes.signOut} onClick={handleSignOut}>
                {__('sign.out')}
            </div>
        </div>
    );
}

export default Tabs;