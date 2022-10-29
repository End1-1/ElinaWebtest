import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';
import { useTranslations } from 'Talons/App/useTranslations';
import { fetchShippingMethods } from 'Store/actions/cart';

export const useOrder = props => {
    const { id } = props;
    const [order, setOrder] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const state = useSelector(state => state);
    const apolloClient = getApolloClient(state);
    const { countries, states, cities, districts } = useSelector(state => state.app);
    const currentShopId = useSelector(state => state.shop);
    const dispatch = useDispatch();

    const fetchOrder = useCallback(async () => {
        const GET_ORDER = gql`
            query customerOrder($orderId: String!) {
                customerOrder(orderId: $orderId) {
                    id
                    orderNumber
                    createdAt
                    subtotal
                    shippingTotal
                    grandTotal
                    shippingAddress {
                        firstName
                        lastName
                        address
                        city
                        countryCode
                        stateCode
                        districtCode
                    }
                    billingAddress {
                        firstName
                        lastName
                        address
                        city
                        countryCode
                    }
                    shippingMethod {
                        carrierName
                        carrierCode
                        rateId
                        price
                        rateName
                    }
                    paymentMethod {
                        methodName
                    }
                    orderStatus {
                        status
                    }
                    paymentStatus {
                        status
                    }
                    fulfillmentStatus {
                        status
                    }
                    items {
                        id
                        name
                        sku
                        price
                        discountedPrice
                        discount
                        quantity
                        thumbnail
                        selectedAttributes {
                            name
                            type
                            option {
                                id
                                name
                                swatch
                            }
                        }
                    }
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_ORDER,
            variables: {
                orderId: id
            }
        });

        const { customerOrder } = data;
        setOrder(customerOrder);
        setIsFetched(true);
    }, [id]);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    useEffect(() => {
        if (currentShopId) {
            dispatch(fetchShippingMethods());
        }
    }, [currentShopId]);

    const { __ } = useTranslations();
    const cityName = useMemo(() => {
        if(cities &&  cities.length) {
            if (order && order.shippingAddress) {
                const { city } = order.shippingAddress;
                const findedCity = cities.find(e => e.id == city);
                return findedCity ? findedCity.name : null
            } else {
                return null
            }
        } else {
            return null
        }
    }, [cities, order]);

    const stateName = useMemo(() => {
        if(states &&  states.length) {
            if (order && order.shippingAddress) {
                const { stateCode } = order.shippingAddress;
                if (stateCode == "ER") {
                    return null
                } else {
                    const state = states.find(e => e.id == stateCode);
                    return state ? state.name : null
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }, [states, order]);

    const districtName = useMemo(() => {
        if(districts &&  districts.length) {
            if (order && order.shippingAddress) {
                const { districtCode } = order.shippingAddress;
                const district = districts.find(e => e.id == districtCode);
                return district ? district.name : null
            } else {
                return null
            }
        } else {
            return null
        }
    }, [districts, order]);

    const countryName = useMemo(() => {
        if(countries &&  countries.length) {
            if (order && order.shippingAddress) {
                const { countryCode } = order.shippingAddress;
                const country = countries.find(e => e.id == countryCode);
                return country ? country.name : null
            } else {
                return null
            }
        } else {
            return null
        }
    }, [countries, order]);

const addressOrder = useMemo(() => {
    if (order && order.shippingAddress) {
        const { city, address } = order.shippingAddress;
        if (city == "ER") {
            return `${address}, ${districtName}, ${cityName}, ${countryName}`
        } else {
            return `${address}, ${cityName}, ${stateName}, ${countryName}`
        }
    } else {
        return ""
    }
}, [order]);


    return {
        addressOrder,
        order,
        isFetched,
        __
    }
}