import React from 'react';
import classes from './page.module.css';
import SignUpComponent from '../SignUp';
import Head from '../Head';

const SignUp = (props) => {

    return (
        <div>
            <Head>
                <title>{'Sign Up'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.body}>
                <SignUpComponent />
            </div>
        </div>
    );
}

export default {
    component: SignUp,
    loadData: () => { }
};