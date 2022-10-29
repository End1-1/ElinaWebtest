import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../../store/actions/shop';
import { useLocation, useHistory } from 'react-router-dom';
import { useConfig } from 'Talons/App/useConfig';
import { fetchCities, fetchCountries, fetchDistricts, fetchStates } from '../../store/actions/app';

export const useLanguageSelect = (props) => {
    const dispatch = useDispatch();
    const { currentLanguage } = useSelector(state => state.shop);
    const location = useLocation();
    const history = useHistory();
    const { getConfigValue } = useConfig();

    const handleLanguageChange = useCallback((localeId) => {
        dispatch(changeLanguage(localeId));
        dispatch(fetchCountries());
        dispatch(fetchStates("AM"));
        dispatch(fetchDistricts("ER"));
        dispatch(fetchCities("AM"));
        // We need to redirect visitors to the url with new language code
        // But first, We check we using short or long versions of languages
        const languageCodeType = getConfigValue('languageCodeType');
        const replaceWhat = languageCodeType == 'short' ? currentLanguage.split('_')[0] : currentLanguage;
        const replaceWith = languageCodeType == 'short' ? localeId.split('_')[0] : localeId;
        const newPathname = location.pathname.replace(replaceWhat, replaceWith);
        history.push(`${newPathname}${location.search}`);
    }, [location, history, currentLanguage]);

    const availableLanguages = useMemo(() => {
        return getConfigValue('allowedShopLanguages') || [];
    });

    const availableLanguagesForAccount = useMemo(() => {
        return getConfigValue('availableLanguages') || [];
    });

    return {
        currentLanguage,
        handleLanguageChange,
        availableLanguages,
        availableLanguagesForAccount
    }
}