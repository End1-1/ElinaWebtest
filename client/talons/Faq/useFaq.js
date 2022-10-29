import { gql } from "@apollo/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import getApolloClient from 'Apollo/apolloClient';
import { useSelector } from "react-redux";
import { useTranslations } from 'Talons/App/useTranslations';


export const useFaq = (props) => {
    // Will be passed in SSR
    const { data } = props;
    const [faqs, setfaqs] = useState(data ? data : []);
    const { enabledNativeApps } = useSelector(state => state.app);
    const { currentLanguage } = useSelector(state => state.shop);
    const state = useSelector(state => state);
    const isModuleEnabled = enabledNativeApps.includes('faq');
    const apolloClient = getApolloClient(state);
    const { __ } = useTranslations();

    const breadcrumbs = useMemo(() => {
        return [ { label: __("home"),  link: "/" }, { label: __("faq")} ]
    }, [currentLanguage, __]);

    const fetchfaqs = useCallback(async () => {
        const GET_FAQS = gql`
            query faqs {
                faqs {
                    items {
                        id
                        question
                        answer
                    }
                }
            }
        `
        const { data } = await apolloClient.query({
            query: GET_FAQS,
            fetchPolicy: "no-cache"
        })
        if(data && data.faqs && data.faqs.items) {
            setfaqs(data.faqs.items);
        }
    })

    useEffect(() => {
        if (isModuleEnabled && !data) {
            fetchfaqs()
        }
    }, [isModuleEnabled, currentLanguage])

    return {
        faqs,
        isModuleEnabled,
        breadcrumbs,
        __
    }
}