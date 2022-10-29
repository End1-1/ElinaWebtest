import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useConfig } from 'Talons/App/useConfig';

export const usePerPage = (props) => {
    const { pageControl } = props;
    const { scopeConfig } = useSelector(state => state.config);
    const location = useLocation();
    const history = useHistory();
    const { getConfigValue, getConfigValueBool } = useConfig();

    const handleChange = useCallback((perPage) => {
        pageControl.setPerPage(Number(perPage));
    }, [location, history, pageControl.setPerPage]);

    const dropdownOption = useMemo(() => {
        const optionsValue = getConfigValue('catalogProductsPerPageSteps'); 
        const valuesSplited = optionsValue ? optionsValue.split(',') : [];
        return valuesSplited.map(value => {
            return {
                value,
                label: value
            }
        })
    }, [scopeConfig]);

    return {
        value: pageControl.currentPerPage,
        isEnabled: getConfigValueBool('catalogProductsAllowCustomersChoosePageSize'),
        dropdownOption,
        handleChange
    }
}