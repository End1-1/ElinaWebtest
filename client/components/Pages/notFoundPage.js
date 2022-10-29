import React from 'react';
import classes from 'Components/Pages/page.module.css';
import Head from 'Components/Head';
import Card from 'Components/Card';

const NotFoundPage = (props) => {
    return (
        <div className={classes.root}>
            <Head>
                <title>{'NotFound'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.body}>
                <div>
                    <Card>
                        This page is currently unavailable
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;