import React from 'react';
import { fetchInitialData } from 'Store/actions/app';
import { useApp } from 'Talons/App/useApp';
import './app.module.css';

const App  = props => {
    const { autoSignInTried } = useApp();

    if (!autoSignInTried) return null;
    
    return (
        <div>
            {props.children}
        </div>
    );
}

export const loadData = async (store, req, res) => {
    return store.dispatch(fetchInitialData(req, res));
}

export default App;