import { useMemo } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';
import { useConfig } from 'Talons/App/useConfig';
import { useSelector } from 'react-redux';

export const useShareButtons = (props) => {
    const { place } = props;
    const { __ } = useTranslations();
    const { getConfigValue, getConfigValueBool } = useConfig();
    const { scopeConfigFetched } = useSelector(state => state.config);

    const shouldShow = useMemo(() => {
        const showInPlaces = scopeConfigFetched ? getConfigValue('socialShareButtonsShowInPlaces') : [];
        return showInPlaces.includes(place);
    }, []);

    const buttonList = useMemo(() => {
        return scopeConfigFetched ? getConfigValue('socialShareButtonsList') : false;
    }, []);

    const showShareCounts = useMemo(() => {
        return scopeConfigFetched ? getConfigValueBool('socialShareButtonsShowCounts') : false;
    }, []);

    const url = typeof window != 'undefined' ? window.location.href : '';

    return {
        shouldShow,
        buttonList,
        showShareCounts,
        url,
        __
    }
}