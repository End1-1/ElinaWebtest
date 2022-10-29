import React from 'react';
import classes from '../page.module.css';
import AddressesComponent from 'Components/MyAccount/addresses';
import { useSelector } from "react-redux";
import isObjectEmpty from 'Helper/isObjectEmpty';
import Head from '../../Head';
import { useTranslations } from 'Talons/App/useTranslations';

const Addresses = (props) => {
    const { __ } = useTranslations();

    const { currentUser } = useSelector(state => state.auth);

    return (
        <div>
            <Head>
                <title>{__('My Addresses')}</title>
            </Head>
            <div className={classes.body}>
                {!isObjectEmpty(currentUser) ? <AddressesComponent currentUser={currentUser} /> : null}
            </div>
        </div>
    );
}

export default Addresses;