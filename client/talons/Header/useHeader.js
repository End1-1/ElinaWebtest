import { useSelector, useDispatch } from 'react-redux';

export const useHeader = () => {
    const { windowSize } = useSelector(state => state.app);
    const { isMobile } = windowSize;
    return {
        isMobile    
    }
}