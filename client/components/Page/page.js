import React, { useCallback, useEffect, useState } from 'react';
import classes from './page.module.css';
import Head from '../Head';
import Builder from 'Components/Builder';
import { useSelector } from 'react-redux';
import RichContent from 'Components/RichContent';


const Page = (props) => {
    const { pageId, page } = props;
    const { editorEnabled } = useSelector(state => state.app);
    const contentType = page.contentType || 'builder';

    return (
        <div className={classes.root}>
            <Head>
                <title>{page ? (page.pageTitle ? page.pageTitle : page.name) : ''}</title>
                <meta name="description" content={page ? page.metaDescription : ''} />
            </Head>
            <div>
                {contentType == 'builder' ? 
                    <Builder contentType={'page'} id={page.id} page={page} content={page.content} /> : 
                    <RichContent html={page.contentHtml} />
                }
            </div>
        </div>
    );
}

export default Page;