import React  from 'react';
import classes from './index.module.css';
import { withRouter } from "react-router";
import Page from 'Components/Page';
import { useHome } from 'Talons/Home/useHome';
import { fetchPage } from 'Store/actions/page';

const Index = (props) => {
    const { page } = useHome();

    if (!page) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Page page={page} />
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