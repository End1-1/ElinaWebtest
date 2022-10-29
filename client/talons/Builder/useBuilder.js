import { useSelector } from "react-redux";

export const useBuilder = (props) => {
    const { isSignedIn } = useSelector(state => state.auth);
    const { isAdmin } = useSelector(state => state.auth.currentUser || {});
    
    return {
        canUseBuilder: isSignedIn && isAdmin
    }
}