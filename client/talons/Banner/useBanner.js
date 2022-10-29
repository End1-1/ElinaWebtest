import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gql, useLazyQuery } from '@apollo/client';
import { fetchBanner } from 'Store/actions/banner';


/**
 * This component will get the data from 2 sources
 * 1 . From props 'data'. This is the case for page builder for example
 * 2 . From Redux 
 */
export const useBanner = props => {
    const { id, data } = props;
    const { data: banners } = useSelector(state => state.banner);
    const { currentLanguage } = useSelector(state => state.shop);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchBanner(id));
        }
    }, [id, currentLanguage]);

    return {
        isFetchingBanner: loading,
        banner: data || (banners.find(banner => banner.id == id && banner.language == currentLanguage) ? banners.find(banner => banner.id == id && banner.language == currentLanguage).data : {})
    }
}