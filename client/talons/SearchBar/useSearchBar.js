import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SHOW_SEARCH_BAR } from 'Store/actions/app';
import { useTranslations } from 'Talons/App/useTranslations';

export const useSearchBar = props => {
    const { loading, results, onSearchChange, seeAllButtonText, seeAllButtonLink, followTrigger } = props;

    const { windowSize, showSearchBar } = useSelector(state => state.app);
    const { isMobile } = windowSize;
    const { __ } = useTranslations();

    const getValue = (event) => {
        onSearchChange(event.target.value)
    }

    const dispatch = useDispatch();

    const setShowSearchBar = useCallback(() => {
        dispatch({
            type: SET_SHOW_SEARCH_BAR,
            payload: !showSearchBar
        });
    }, [showSearchBar]);

    return {
        getValue,
        results,
        loading,
        isMobile,
        setShowSearchBar,
        showSearchBar,
        followTrigger,
        __
    }
}