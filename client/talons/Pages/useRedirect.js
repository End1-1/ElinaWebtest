import { useLocation, useHistory } from "react-router-dom"
import { useEffect } from "react";
import { useConfig } from 'Talons/App/useConfig';
import { useSelector } from "react-redux";

export const useRedirect = () => {
    const location = useLocation();
    const history = useHistory();
    const { currentLanguage } = useSelector(state => state.shop);
    const { getConfigValue } = useConfig();
    
    // Redirect with correct language code if not provided, for example http://localhost:3004/ = http://localhost:3004/hy/
    // Note: Actually this redirect should happen server-side, coz if we do like this, SSR will not work.
    // For example homepage content will not be SSR-ed 
    // That logic is in fetchInitialData, already implemented, but we keep this anyways
    useEffect(() => {
        const defaultLanguage = getConfigValue('defaultLanguage');
        const languageCodeInUrl = getConfigValue('languageCodeInUrl');
        // languageCodeInUrl can be 'no', 'firstParam', ... 
        if (languageCodeInUrl == 'no') {
            return;
        }
        const language = currentLanguage || defaultLanguage;
        if (language) {
            const languageCodeType = getConfigValue('languageCodeType');
            const languageCode = languageCodeType == 'short' ? language.split('_')[0] : language;
            const redirectUrl = `${languageCode}${location.pathname}${location.search}`;
            history.replace(redirectUrl);
        }
        
    }, [currentLanguage]);
    

    return {
    }
}