import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import symbols from './currencySymbols';
import { useConfig } from 'Talons/App/useConfig';
import { useTranslations } from 'Talons/App/useTranslations';

export const usePrice = (props) => {
    const { scopeConfig } = useSelector(state => state.config);
    const { currentLanguage } = useSelector(state => state.shop);
    const { getConfigValue } = useConfig();
    const { __ } = useTranslations();

    const currency = useMemo(() => {
        const symbols = getConfigValue('currencySymbols');
        const currentCurrency = getConfigValue('defaultShopCurrency');
        if (currentCurrency) {
            const currencySymbolData = symbols.find(({ currencyId }) => currencyId == currentCurrency);
            if (currencySymbolData && currencySymbolData.label && currencySymbolData.label[currentLanguage]) {
                return currencySymbolData.label[currentLanguage];
            }
        }
        return 'usd';
    }, [scopeConfig, currentLanguage]);

    return {
        currencySymbol: currency,
        currencyValue: scopeConfig.baseCurrency ? scopeConfig.baseCurrency.value : "",
        __
    }
}