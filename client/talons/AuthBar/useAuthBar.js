import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { signOut } from 'Store/actions/auth';
import { useTranslations } from 'Talons/App/useTranslations';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useAuthBar = (props = {}) => {
    const { redirectPath } = props;
    const { __ } = useTranslations();
    const history = useHistory();

    const { isSignedIn } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleSignOut = useCallback(async () => {
        await dispatch(signOut());
        if (redirectPath) {
            history.push(redirectPath);
        }
    }, []);

    return {
        handleSignOut,
        isSignedIn,
        __
    }
}