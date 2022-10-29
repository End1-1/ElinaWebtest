import { useParams } from "react-router-dom"
import { gql } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import get from 'lodash/get'
import getApolloClient from 'Apollo/apolloClient';
import { useSelector } from 'react-redux';

export const useSocialIcons = () => {
    const params = useParams()
    const [data, setData] = useState(false);
    const { currentLanguage } = useSelector(state => state.shop);
    const state = useSelector(state => state);
    const apolloClient = getApolloClient(state);
    
    const fetchSocialIconData = useCallback(async () => {
        const GET_SOCIAL_ICON_DATA = gql`
            query socialIcons {
                socialIcons {
                    id
                    socialId
                    label
                    url
                }
            }
        `
        const { data } = await apolloClient.query(
            {
                query: GET_SOCIAL_ICON_DATA,
                variables: {},
                fetchPolicy: "no-cache"
            })
            setData(get(data, 'socialIcons', {}));
    }, [apolloClient])

    useEffect(() => {
        fetchSocialIconData()
    }, [])

    return {
        data    
    }
}