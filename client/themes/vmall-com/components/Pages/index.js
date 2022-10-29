import React, { useMemo }  from 'react';
import classes from './index.module.css';
import { withRouter } from "react-router";
import Page from 'Components/Page';
import { useHome } from 'Talons/Home/useHome';
import { fetchPage } from 'Store/actions/page';
import PriceTable from '../PriceTable';
import BlogPostsWidget from 'Components/BlogPostsWidget';
import Block from 'Components/Block';
import { useConfig } from 'Talons/App/useConfig';

const Index = (props) => {
    const { page } = useHome();
    const { getConfigValue } = useConfig();

    const topBlockId = useMemo(() => {
        return getConfigValue('vmallHomeTopBlock');
    }, []);

    console.log('topBlockId', topBlockId);

    if (!page) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Page page={page} />
        </div>
    );

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <h3 className={classes.featuresHeading}>Suitable for any kind of business</h3>
                <div className={classes.features}>
                    <div className={classes.feature}>
                        <div className={classes.featureContent}>
                            {topBlockId && <Block blockId={topBlockId} />}
                        </div>
                        
                        <div className={classes.featureImage}>
                            <img src={'/images/homepage-image.svg'} />
                        </div>
                    </div>
                    <div className={classes.feature}>
                        <div className={classes.featureContent}>
                            <div>
                                <h3>The world’s most advanced last mile delivery platform</h3>
                                <p>
                                    The world’s most advanced last mile delivery platform
                                </p>
                            </div>
                        </div>
                        <div className={classes.featureImage}>
                            <img src={'/images/homepage-image.svg'} />
                        </div>
                    </div>
                    <div className={classes.feature}>
                        <div className={classes.featureContent}>
                            <div>
                                <h3>The world’s most advanced last mile delivery platform</h3>
                                <p>
                                    The world’s most advanced last mile delivery platform
                                </p>
                            </div>
                        </div>
                        <div className={classes.featureImage}>
                            <img src={'/images/homepage-image.svg'} />
                        </div>
                    </div>
                    <div className={classes.feature}>
                        <div className={classes.featureContent}>
                            <div>
                                <h3>The world’s most advanced last mile delivery platform</h3>
                                <p>
                                    The world’s most advanced last mile delivery platform
                                </p>
                            </div>
                        </div>
                        <div className={classes.featureImage}>
                            <img src={'/images/homepage-image.svg'} />
                        </div>
                    </div>
                </div>
            </div>
            <PriceTable />
            <BlogPostsWidget />
        </div>
    );
}

export const loadData = (store, req) => {
    // Fetch page on server
    const homePageId = store.getState().config.scopeConfig.homePageId.value;
    const promises = [];
    if (homePageId) {
        promises.push(store.dispatch(fetchPage(homePageId)));
    }
    return Promise.all(promises);
}

export default {
    component: withRouter(Index),
    loadData
};