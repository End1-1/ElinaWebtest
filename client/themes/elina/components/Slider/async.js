import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export const fetchSliderData = async (sliderId, currentShopId) => {
    const apolloClient = getApolloClient(null);
    
    const GET_SHOP_SLIDER = gql`
        query getShopSlider($sliderId: String!) {
            getShopSlider(sliderId: $sliderId) {
                id
                name
                    slides {
                        id
                        name
                        image
                    }
                }
        }
    `;
    const { data } = await apolloClient.query({
        query: GET_SHOP_SLIDER,
        variables: {
            sliderId: sliderId,
            shopId: String(currentShopId),
            params: {
            }
        },
        fetchPolicy: "no-cache"
    });

    const { getShopSlider: result } = data;
    return result;
}