import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from 'Store/actions/cart';
import { useConfig } from 'Talons/App/useConfig';
import isEmpty from 'lodash/isEmpty'


export const useItem = (props) => {
    const { product, variant, placementInfo } = props;

    const { getConfigValue } = useConfig();

    const imageUrl = useMemo(() => {
        const images = variant && variant.product.images && variant.product.images.length ? variant.product.images : product.images;
        const image = images.find(i => i.roles.includes('listingPage')) || images[0];
        return !isEmpty(image) ? image.path : "";
    }, [product, variant]);
    const [isAddingToCart, setIsAddingToCart, allowedOptions] = useState();
    
    const dispatch = useDispatch();
    const initialVisibleOptions = useMemo(() => {
        if (product && product.configurableAttributes) {
            return product.configurableAttributes.filter(attr => attr.showInitiallyOnListings).map(attr => attr.attributeId);
        }
        return [];
    }, [product]);
    
    const [showOptionsPartially, setShowOptionsPartially] = useState(true);

    const visibleOptions = useMemo(() => {
        // false = all
        return showOptionsPartially ? initialVisibleOptions : true;
    }, [showOptionsPartially]);

    const showReviewSummary = useMemo(() => {
        const showReviewSum = getConfigValue('showProductReviewsOnListings');
        return showReviewSum || false;
    }, []);


    const handleAddToCart = useCallback(async (product) => {
        console.log('Adding to cart', product);
        setIsAddingToCart(product.ProductID);
        await dispatch(addProductToCart({
            productId: product.id,
            name: product.name,
            quantity: 1
        }));
        setIsAddingToCart(null);
    }, []);

    const link = useMemo(() => {
        if (placementInfo && placementInfo.type == 'categoryPage' && placementInfo.categoryId ) {
            return {
                pathname: `/${product.urlKey}`,
                state: {
                    referer: {
                        type: 'category',
                        id: placementInfo.categoryId
                    }
                }
            }
        }
        return `/${product.urlKey}`;
    }, [product, placementInfo]);
    
    return {
        link,
        handleAddToCart,
        imageUrl,
        isAddingToCart,
        visibleOptions,
        showOptionsPartially,
        setShowOptionsPartially,
        showReviewSummary
    }
}