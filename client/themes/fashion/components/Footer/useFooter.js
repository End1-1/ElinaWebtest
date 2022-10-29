import { useMemo } from 'react';
import { useConfig } from 'Talons/App/useConfig';

export const useFooter = props => {
    const { getConfigValue } = useConfig();

    const footerBlockId = useMemo(() => {
        return getConfigValue('fashionFooterBlockId');
    }, []);

    return {
        footerBlockId
    }
}