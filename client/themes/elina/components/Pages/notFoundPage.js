import React from 'react';
import Button from 'Components/Button';
import classes from './notFound.module.css';
import Link from 'Components/Link';
import { useTranslations } from 'Talons/App/useTranslations';
import Head from 'Components/Head';

const NotFound = () => {
    const { __ } = useTranslations();

    return (
        <div>
             <Head>
                <title>{__('not.found')}</title>
            </Head>
            <div className={classes.root}>
                <h3>{__("oops")}...</h3>
                <p>{__("error.page.message")}</p>
                <div className={classes.code}>
                    <h1>4</h1>
                    <h1>0</h1>
                    <h1>4</h1>
                </div>
                <Link to={"/"}>
                    <Button classes={{button: classes.button}}>{__("go.to.home.page")}</Button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;