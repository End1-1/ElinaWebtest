import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useConfig } from 'Talons/App/useConfig';

export const useSort = (props) => {
    const { pageControl } = props;
    const { scopeConfig } = useSelector(state => state.config);
    const location = useLocation();
    const history = useHistory();
    const { getConfigValue, getConfigValueBool } = useConfig();

    const handleChange = useCallback((sort) => {
        pageControl.setSort(sort);
    }, [location, history, pageControl.setSort]);

    const handleDirSwitch = useCallback((dir) => {
        pageControl.setDir(dir);
    }, [pageControl.currentDir]);

    const dropdownOption = useMemo(() => {
        const availableOptions = getConfigValue('catalogProductsSortingOptions'); 
        return availableOptions ? availableOptions.map(value => {
            return {
                value,
                label: value
            }
        }): []
    }, [scopeConfig]);
    

    return {
        value: pageControl.currentSort,
        dir: pageControl.currentDir,
        isEnabled: getConfigValueBool('catalogProductsEnableSorting'),
        dropdownOption,
        handleChange,
        handleDirSwitch
    }
}