import React, { Fragment } from 'react';
import { fetchInitialData } from 'Store/actions/app';
import { useApp } from 'Talons/App/useApp';
import './app.module.css';
import Drawer from 'Components/Drawer';
import GoogleAnalytics from 'Components/GoogleAnalytics';
import FacebookPixel from 'Components/FacebookPixel';
import YandexMetrica from 'Components/YandexMetrica';
import Main from 'Components/Main';

const App  = props => {
    const { autoSignInTried, mainMargins } = useApp();
    // @todo. Implement this for SSR
    if (typeof window != 'undefined' && !autoSignInTried) return null;
    
    return (
        <Fragment>
            <GoogleAnalytics />
            <FacebookPixel />
            <YandexMetrica />
            <Drawer />
            {/** Left and right margins are for builder elements and toolbar */}
            <div style={{ marginLeft: `${mainMargins.left}px`, marginRight: `${mainMargins.right}px` }}>
                {/** When rendering on server side, main component is passed from server main file, on client side, use the Main js file */}
                <Main>{props.children}</Main>
            </div>
        </Fragment>
    );
}

export const loadData = async (store, req, res) => {
    return store.dispatch(fetchInitialData(req, res));
}

export default App;