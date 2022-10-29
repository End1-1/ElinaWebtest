import React, { useEffect } from 'react';
import classes from './page.module.css';
import MyAccount from 'Components/MyAccount';
import { fetchCurrentUserDetails } from 'Store/actions/auth';
import { useSelector, useDispatch } from "react-redux";
import isObjectEmpty from 'Helper/isObjectEmpty';
import Head from 'Components/Head';
import { useTranslations } from 'Talons/App/useTranslations';

const Account = (props) => {

    const dispatch = useDispatch();

    const { __ } = useTranslations();

    const { currentUser } = useSelector(state => state.auth);
    return (
        <div>
            <Head>
                <title>{__('my.account')}</title>
            </Head>
            <div className={classes.body}>
                {!isObjectEmpty(currentUser) ? <MyAccount currentUser={currentUser} /> : null}
            </div>
        </div>
    );
}

export default Account;