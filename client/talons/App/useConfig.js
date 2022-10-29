import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useConfig = (props) => {
    const { scopeConfig } = useSelector(state => state.config);
    const getConfigValue = useCallback((configId) => {
        return scopeConfig && scopeConfig[configId] ? scopeConfig[configId].value : '';
    }, [scopeConfig]);

    const getConfigValueBool = useCallback((configId) => {
        return scopeConfig && scopeConfig[configId] && (scopeConfig[configId].value && scopeConfig[configId].value != 'no') ? true : false;
    }, [scopeConfig]);
    return {
        getConfigValue,
        getConfigValueBool
    }
}