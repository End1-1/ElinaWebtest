import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';
import { useTranslations } from 'Talons/App/useTranslations';
import { usePagination } from 'Hooks/usePagination';
import { getCartDetails } from 'Store/actions/cart';

export const useOrders = (props = {}) => {
    const { type, perPage } = props;
    const [orders, setOrders] = useState([]);
    const state = useSelector(state => state);
    const apolloClient = getApolloClient(state);
    const [activeOrderId, setActiveOrderId] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    // Set up pagination.
    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;

    const fetchOrders = useCallback(async () => {
        const GET_ORDERS = gql`
            query customerOrders($params: CustomerOrdersParamsInput) {
                customerOrders(params: $params) {
                    items {
                        id
                        orderNumber
                        createdAt
                        grandTotal
                        paymentMethod {
                            methodCode
	                        methodName
                        }
                        shippingAddress {
                            firstName
                            lastName
                            address
                            city
                            countryCode
                        }
                        billingAddress {
                            firstName
                            lastName
                            address
                            city
                            countryCode
                        }
                        items {
                            id
                            productId
                            quantity
                            name
                            sku
                            price
                            thumbnail
                            options {
                                optionId
	                            valueId
                            }
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
                        orderStatus {
                            status
                        }
                        paymentStatus {
                            status
                        }
                        fulfillmentStatus {
                            status
                        }
                    }
                    total
                    totalPages
                }
            }
        `;

        let params = {
            page: currentPage,
        }

        if (type == 'latest') {
            params = {
                ...params,
                pageSize: perPage || 2,
                sort: 'createdAt',
                dir: 'asc'
            }
        }

        const { data } = await apolloClient.query({
            query: GET_ORDERS,
            variables: {
                params
            }
        });

        const { customerOrders } = data;
        setOrders(customerOrders.items);
        setTotalPages(customerOrders.totalPages);
    }, [currentPage]);

    useEffect(() => {
        fetchOrders();
        dispatch(getCartDetails());
    }, [currentPage]);

    const { __ } = useTranslations();

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages,
        pageSize: 5
    };
    const formateDate = useCallback((date) => {
        const tempDate = new Date(Number(date));
        const day = tempDate.getDate() > 9 ? tempDate.getDate() : `0${tempDate.getDate()}`
        const month = tempDate.getMonth()  + 1 > 9 ? tempDate.getMonth()  + 1 : `0${tempDate.getMonth()  + 1}`
        const year = tempDate.getFullYear();
        return `${day}/${month}/${year}`
    }, []);

    return {
        orders,
        pageControl,
        formateDate,
        openModal,
        setOpenModal,
        activeOrderId,
        setActiveOrderId,
        __
    }
}