import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from 'Store/actions/app';

export const useNavTrigger = (props) => {
    const dispatch = useDispatch();

    const { drawer } = useSelector(state => state.app);

    const handleToggleMobileMenu = useCallback(() => {
        dispatch({ type: TOGGLE_DRAWER, payload: 'nav' });
    }, []);

    return {
        isOpen: drawer == 'nav',
        handleToggleMobileMenu
    }
}