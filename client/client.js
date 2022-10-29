import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getRoutes } from './routes';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { renderRoutes } from 'react-router-config';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import App from 'Components/App';

const store = createStore(reducers, window.INITIAL_STATE, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                {renderRoutes(getRoutes(store.getState().app.configs.languageCodeInUrl == 'no' ? false : true, store.getState().app.configs.supportedLangCodesInUrl))}
            </App>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));