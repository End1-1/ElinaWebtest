import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useDispatch } from "react-redux";
import classes from './builder.module.css';
import BuilderContent from '../BuilderContent';
import Icon from '../BuilderEditor/icon';
import { SET_BUILDER_STATUS } from 'Store/actions/app';
import { useBuilder } from 'Talons/Builder/useBuilder';

// We need the Builder Editor in rare cases only, so we will lazy load that
const BuilderEditor = lazy(() => import('../BuilderEditor'));

const Builder  = props => {
    const [editorEnabled, setEditorEnabled] = useState(false);
    const { canUseBuilder } = useBuilder();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: SET_BUILDER_STATUS,
            payload: editorEnabled
        });
    }, [editorEnabled]);
    
    return (
        <div className={classes.root}>
            {canUseBuilder && <div className={classes.editorSwitch}>
                <button className={'builder-button'} onClick={() => setEditorEnabled(!editorEnabled)}>
                    <Icon name={editorEnabled ? 'close' : 'pencil'} />
                </button>
            </div>}
            {canUseBuilder && editorEnabled ? 
                <Suspense fallback={<div>Loading...</div>}>
                    <BuilderEditor {...props} setEditorEnabled={setEditorEnabled} /> 
                </Suspense>
                : <BuilderContent {...props} />}
        </div>
    );
}

export default Builder;