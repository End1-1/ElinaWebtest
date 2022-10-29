import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from 'Store/actions/app';
import { signOut } from 'Store/actions/auth';

export const useDrawer = (props) => {
    const dispatch = useDispatch();

    const [signInSignUp, setIssignInSignUp] = useState('');
    const { drawer } = useSelector(state => state.app);
    const { isSignedIn } = useSelector(state => state.auth);

    const handleToggleDrawer = useCallback((drawer) => {
        dispatch({ type: TOGGLE_DRAWER, payload: drawer });
    }, []);

    const handleSignOut = useCallback(() => {
        dispatch(signOut());
    }, []);

    const closeModal = () => {
        setIssignInSignUp("")
    }

    const showSignInSignUp = (element) => {
        setIssignInSignUp(element);
    }

    return {
        handleToggleDrawer,
        drawer,
        isSignedIn,
        handleSignOut,
        signInSignUp,
        setIssignInSignUp,
        closeModal,
        showSignInSignUp
    }
}