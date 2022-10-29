import { useEffect, useMemo } from "react";
import { useConfig } from 'Talons/App/useConfig';
import { fetchPage } from 'Store/actions/page';
import { useSelector, useDispatch } from 'react-redux';
import useWindowSize from 'Hooks/useWindowSize';
import { useTranslations } from 'Talons/App/useTranslations';

export const useHome = () => {
    const { getConfigValue } = useConfig();
    const { data: allPages } = useSelector(state => state.page);
    const { currentLanguage } = useSelector(state => state.shop);
    
    const homePageId = getConfigValue('homePageId');
    const dispatch = useDispatch();
    const { isMobile, isTablet, width } = useWindowSize(); 
    const { __ } = useTranslations();

    useEffect(() => {
        // If we don't have homepage data in redux (with active language), then fetch it
        if (homePageId && !allPages.find(({ id, language }) => id == homePageId && language == currentLanguage)) {
            dispatch(fetchPage(homePageId));
        }
    }, [homePageId, currentLanguage, allPages]);

    const page = useMemo(() => {
        return allPages.find(({ id, language }) => id == homePageId && language == currentLanguage) ? allPages.find(({ id, language }) => id == homePageId && language == currentLanguage).page : false;
    }, [homePageId, allPages, currentLanguage]);

    return {
        page,
        isMobile,
        isTablet,
        width,
        __
    }
}