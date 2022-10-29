export const FETCH_STORE_LOCATIONS = "fetch_store_locations";

import getApolloClient from 'Apollo/apolloClient';
import get from 'lodash/get';
import { gql } from '@apollo/client';

export const fetchStoreLocations = () => {
    return async (dispatch, getState) => {
        const apolloClient = getApolloClient(getState());
        const GET_STORE_LOCATIONS = gql`
            query storeLocations {
                storeLocations {
                    items {
                        id
                        address
                        image
                        phoneNumber
                        embedHtml
                        workingHours {
                            from
                            to
                        }

                    }
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_STORE_LOCATIONS,
            variables: {},
            fetchPolicy: "no-cache"
        });

        if (data && data.storeLocations) {
            const items = data.storeLocations.items
            await dispatch({
                type: FETCH_STORE_LOCATIONS,
                payload: items
            })
        }
    }
}