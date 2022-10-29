import React, { useEffect } from 'react';
import classes from './page.module.css';
import SignInComponent from '../SignIn';
import Head from '../Head';

const SignIn = (props) => {
    return (
        <div>
            <Head>
                <title>{'Sign In'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.body}>
                <SignInComponent />
            </div>
        </div>
    );
}

export default {
    component: SignIn,
    loadData: () => { }
};