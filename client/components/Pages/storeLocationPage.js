import React from 'react';
import classes from './page.module.css';
import StoreLocationContent from 'Components/StoreLocationContent';
import Head from 'Components/Head';

const StoreLocation = (props) => {

    return (
        <div>
            <Head>
                <title>{'Stores'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <StoreLocationContent />
            </div>
        </div>
    );
}

export default {
    component: StoreLocation,
    loadData: () => { }
};