import { useEffect, useCallback, useState } from 'react';
import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { ProductWithOptionsFragment } from 'Fragments/productWithOptions.gql';
import { fetchProductsForSlider } from 'Store/actions/product';

/**
 *
 * @param {*} props.query the product slider data query
 * @param {*} props.id category id of the products
 * @param {*} props.pageSize limit of products
 */
export const useProductSlider = props => {
    const { query, id, type, pageSize, products } = props;
    const [items, setItems] = useState(products);
    const [isFetchingProducts, setIsFetchingProducts] = useState(false);
    const { currentShopId } = useSelector(state => state.shop);
    const { token } = useSelector(state => state.auth);
    const { sliderProducts } = useSelector(state => state.product);
    const dispatch = useDispatch();

    // fetch categories
    useEffect(() => {
        if (id || type) {
            if (['category', 'bestsellers'].includes(type)) {
                dispatch(fetchProductsForSlider({
                    categoryId: id,
                    type
                }));
            }
        }
    }, [id, type]);

    const fetchSliderProducts = useCallback(async (categoryId) => {
        const apolloClient = getApolloClient();
        setIsFetchingProducts(true);
        
        const GET_CATEGORY_PRODUCTS = gql`
            query categoryProducts($categoryId: ID!, $params: CategoryProductsParamsInput) {
                categoryProducts(categoryId: $categoryId, params: $params) {
                    products {
                        ...ProductWithOptionsFragment
                    }
                }
            }
            ${ProductWithOptionsFragment}
        `;
        const { data } = await apolloClient.query({
            query: GET_CATEGORY_PRODUCTS,
            variables: {
                categoryId: categoryId,
                shopId: String(currentShopId),
                params: {
                }
            },
            fetchPolicy: "no-cache"
        });

        const { categoryProducts: result } = data;
        setItems(result.products);
        setIsFetchingProducts(false);
    }, [setItems, token]);
    return {
        items: type == 'relatedProducts' ? products : (sliderProducts.find((item) => item.id == id) ? sliderProducts.find((item) => item.id == id).products : []),
        isFetchingProducts
    }
}