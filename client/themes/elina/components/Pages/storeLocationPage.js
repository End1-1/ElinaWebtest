import React from 'react';
import { mergeClasses } from 'Helper/classify';
import StoreLocationConent from 'Components/StoreLocationContent/storeLocationContent';
import Head from 'Components/Head';
import { useTranslations } from 'Talons/App/useTranslations';
import defaultClasses from './page.module.css';

const StoreLocation = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { __ } = useTranslations();
    
    return (
        <div className={classes.root}>
            <Head>
                <title>{__('our.stores')}</title>
            </Head>
            <StoreLocationConent/>
        </div>
    )
};

export default {
    component: StoreLocation,
    loadData: () => { }
};