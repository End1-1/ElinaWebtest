import React from 'react';
import defaultClasses from './accountModal.css';
import { mergeClasses } from 'Helper/classify'
import Link from 'Components/Link';

const AccountModal = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { handleSignOut } = props;
    
    return (
        <div className={classes.root}>
            <div className={classes.item}>
                <Link to="/account">
                    <span>My Account</span>
                </Link>
            </div>
            <div className={classes.item}>
                <Link to="/account/orders">
                    <span>My Orders</span>
                </Link>
            </div>
            <div className={classes.item}>
                <Link to="/" onClick={handleSignOut}>
                    <span className={classes.signOut}>Sign Out</span>
                </Link>
            </div>
        </div>
    )
}

export default AccountModal;