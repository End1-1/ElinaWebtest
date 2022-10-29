import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false }, { parent: '#container' });
import { SET_WINDOW_SIZE } from 'Store/actions/app';
import { autoSignIn } from 'Store/actions/auth';
import useWindowSize from 'Hooks/useWindowSize';
import { fetchCountries, fetchStates, fetchDistricts, fetchCities } from '../../store/actions/app';

export const useApp = (props) => {
    const { isFetchingUnknownRoute, editorEnabled } = useSelector(state => state.app);
    const { autoSignInTried } = useSelector(state => state.auth);
    // This will be used to add margin to main element when builder is enabled
    const [mainMargins, setMainMargins] = useState({ left: 0, right: 0 });
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    useEffect(() => {
        dispatch({
            type: SET_WINDOW_SIZE,
            payload: windowSize
        });
    }, [windowSize]);

    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchStates("AM"));
        dispatch(fetchDistricts("ER"));
        dispatch(fetchCities("AM"));
    }, [fetchCountries, fetchCities, fetchDistricts, fetchStates]);

    useEffect(() => {
        if (isFetchingUnknownRoute) {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [isFetchingUnknownRoute]);

    const getMainMargins = useCallback(() => {
        let elementsWidth = 0;
        let toolbarWidth = 0;
        const elementsDom = document.querySelector('.builder-elements');
        if (elementsDom) {
            const elementsRect = elementsDom.getBoundingClientRect();
            elementsWidth = elementsRect.width;
        }
        const toolbarDom = document.querySelector('.builder-toolbar');
        if (toolbarDom) {
            const toolbarRect = toolbarDom.getBoundingClientRect();
            toolbarWidth = toolbarRect.width;
        }
        setMainMargins((margins) => {
            if (margins.left != elementsWidth || margins.right != toolbarWidth) {
                return {
                    left: elementsWidth,
                    right: toolbarWidth
                }
            }
            return margins;
        });
    }, []);

    useEffect(() => {
        if (editorEnabled) {
            setInterval(getMainMargins, 100);
        }
    }, [editorEnabled]);

    useEffect(() => {
        // Add this class, so that we can show the page with fade effect when react is loaded
        document.getElementsByTagName('body')[0].classList.add("react-loaded")
        dispatch(autoSignIn());
    }, []);

    return {
        autoSignInTried,
        editorEnabled,
        mainMargins
    }
}