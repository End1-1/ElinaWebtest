import { useTranslations } from 'Talons/App/useTranslations';
import { useConfig } from 'Talons/App/useConfig';

export const useSubscribeForm = (props) => {
    const { getConfigValue } = useConfig();
    const subscribeViaValue = getConfigValue("SubscribeVia");
    const { __ } = useTranslations();


    return {
        subscribeViaValue,
        __
    }
}