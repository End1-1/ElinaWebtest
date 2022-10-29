import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useTranslations = (props) => {
    const { translations } = useSelector(state => state.app);
    
    const __ = useCallback((phrase) => {
        const found = translations.find(t => t.id == phrase);
        return found ? found.translation : phrase;
    }, [translations]);
    
    return {
        __
    }
}