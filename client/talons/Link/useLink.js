import { useSelector } from 'react-redux';
import { useConfig } from 'Talons/App/useConfig';
import { prefixPath } from 'Helper/localizeRoutes';
import { useCallback } from 'react';

export const useLink = (props) => {
    const { currentLanguage } = useSelector(state => state.shop);
    const { getConfigValue } = useConfig();

    const languageCodeType = getConfigValue('languageCodeType');
    const languageCodeInUrl = getConfigValue('languageCodeInUrl');

    const languageCode = languageCodeType == 'short' ? currentLanguage.split('_')[0] : currentLanguage;

    const getLocalizedUrl = useCallback((path) => {
        // Don't add the language prefix if as such is specified in admin
        if (languageCodeInUrl == 'no') {
            return path;
        }
        return prefixPath(path, languageCode);
    }, [languageCodeInUrl, languageCode]);

    return {
        currentLanguage,
        languageCode,
        getLocalizedUrl
    }
}