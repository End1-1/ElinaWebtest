import React from 'react';
import classes from '../page.module.css';
import DashboardComponent from 'Components/MyAccount/dashboard';
import { useSelector, useDispatch } from "react-redux";
import isObjectEmpty from 'Helper/isObjectEmpty';
import Head from '../../Head';
import { useTranslations } from 'Talons/App/useTranslations';

const Dashboard = (props) => {
    const { __ } = useTranslations();

    const { currentUser } = useSelector(state => state.auth);

    return (
        <div>
            <Head>
                <title>{__('Dashboard')}</title>
            </Head>
            <div className={classes.body}>
                {!isObjectEmpty(currentUser) ? <DashboardComponent currentUser={currentUser} /> : null}
            </div>
        </div>
    );
}

export default Dashboard;