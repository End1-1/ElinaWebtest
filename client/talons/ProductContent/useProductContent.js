import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from 'Store/actions/cart';
import { useTranslations } from 'Talons/App/useTranslations';
import { useConfig } from 'Talons/App/useConfig';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';


const isProductConfigurable = (product) => {
    return product.configurableAttributes && product.configurableAttributes.length;
}

// Get allowed options, rather their values. Based on the previous selections
// For example, don't show Red, if it is out of stock, or don't show Large, if
// customer has selected Red, and you don't have Red-Large 
const getAllowedOptions = (product, optionSelections, showOutOfStockVariants) => {
    const isConfigurable = product.configurableAttributes && product.configurableAttributes.length;
    if (!isConfigurable) return [];
    // previousConfig keeps the already analysed options. We need this because let's say we have color and size, 
    // in order to find out which options wee have for size, we need to know what was choosen for color. In this ccase
    // when color will bee in previousConfig when order comes to size
    const previousConfig = [];
    const allowedOptions = product.configurableAttributes.map(option => {
        let selectedValue = false;
        const availableValuesForCurrentOption = [];
        // Check if the option value is selected
        optionSelections.forEach((value, key) => {
            if (key == option.attributeId && value) {
                selectedValue = value;
            }
        });
        if (previousConfig.length) {
            // Find out which variants are allowed for prevousConfig, and see which values they have
            // for the current option, and the list of that values will be the available for the current option selection
            // For example if they have selected "red" for the first option, we need to get the list of "red" products
            // and see what values do they have for "size" options, to show them to the customer for selection
            product.variants.map(variant => {
                // We don't want to show variants which are out of stock
                if (!showOutOfStockVariants && variant.product.quantity == 0) {
                    return false;
                }
                let allowed = true;
                // Here we check if this variant is compatible with previousConfig.
                previousConfig.map(({ id, code, value }) => {
                    if (variant.attributes.find(attr => attr.attributeId == id).optionId != value) {
                        allowed = false;
                    }
                });

                // If 
                if (allowed) {
                    availableValuesForCurrentOption.push(variant.attributes.find(attr => attr.attributeId == option.attributeId).optionId);
                }
                return allowed;
            });
        } else {
            // If there is not previous config, all values are allowed besides the one which are out of stock
            product.variants.map(variant => {
                // We don't want to show variants which are out of stock
                // if (variant.product.quantity == 0) {
                //     return false;
                // }
                const optionValueForVariant = variant.attributes.find(attr => attr.attributeId == option.attributeId).optionId;
                if (!availableValuesForCurrentOption.includes(optionValueForVariant)) {
                    availableValuesForCurrentOption.push(optionValueForVariant);
                }
            });
        }
        if (selectedValue) {
            previousConfig.push({
                id: option.attributeId,
                code: option.attributeCode,
                value: selectedValue
            });
        }
        return { ...option, values: option.values.filter((option) => availableValuesForCurrentOption.includes(option.id) )}
    });
    return allowedOptions;
};

const findMatchingVariant = ({
    variants,
    optionCodes,
    optionSelections
}) => {
    return variants.find(({ attributes, product }) => {
        for (const [id, value] of optionSelections) {
            // If there is at least 1 selection, which doesn't match with the variant, it doesn't match
            const variantAttribute = attributes.find(attr => attr.attributeId == id);
            if (!variantAttribute || variantAttribute.optionId != value) {
                return false;
            }
        }

        // otherwise, every option selection matched
        // and this is the correct variant
        return true;
    });
};

const INITIAL_OPTION_CODES = new Map();
const INITIAL_OPTION_SELECTIONS = new Map();
const INITIAL_QUANTITY = 1;

const deriveOptionCodesFromProduct = product => {
    // If this is a simple product it has no option codes.
    if (!isProductConfigurable(product)) {
        return INITIAL_OPTION_CODES;
    }

    // Initialize optionCodes based on the options of the product.
    const initialOptionCodes = new Map();
    for (const {
        attributeId,
        attributeCode
    } of product.configurableAttributes) {
        initialOptionCodes.set(attributeId, attributeCode);
    }

    return initialOptionCodes;
};

const getDefaultOptionSelections = (product, fromListingPage) => {
    const optionSelections = new Map();
    const { configurableAttributes } = product;
    const defaultVariant = product.variants.find(v => v.isDefault) || false;
    if (fromListingPage) {
        if (defaultVariant) {
            const { attributes } = defaultVariant;
            if (attributes && attributes.length) {
                for (let index = 0; index < attributes.length; index++) {
                    const element = attributes[index];
                    optionSelections.set(element.attributeId, element.optionId)
                }
            } else {
                if (configurableAttributes && configurableAttributes.length) {
                    for (let index = 0; index < configurableAttributes.length; index++) {
                        const attribute = configurableAttributes[index];
                        optionSelections.set(attribute.attributeId, attribute.values[0].id)
                    }
                }
            }
        }
    } else {
        const selectedOptionsResult =  typeof localStorage == 'undefined' ? "" : localStorage.getItem("selectedOptions");
        if (configurableAttributes && configurableAttributes.length) {
            for (let index = 0; index < configurableAttributes.length; index++) {
                const attribute = configurableAttributes[index];
                if (attribute.label && attribute.label.toLowerCase().includes("color")) {
                    optionSelections.set(attribute.attributeId, attribute.values[0].id)
                }
            }
        }
        if (selectedOptionsResult) {
            const selectedOptions = JSON.parse(selectedOptionsResult);
            if (product.id == selectedOptions.product) {
                optionSelections.set(selectedOptions.attributeId, selectedOptions.selection)
            } else if (defaultVariant) {
                const { attributes } = defaultVariant;
                if (attributes && attributes.length) {
                    for (let index = 0; index < attributes.length; index++) {
                        const element = attributes[index];
                        optionSelections.set(element.attributeId, element.optionId)
                    }
                } 
            }
        } else if (defaultVariant) {
            const { attributes } = defaultVariant;
            if (attributes && attributes.length) {
                for (let index = 0; index < attributes.length; index++) {
                    const element = attributes[index];
                    optionSelections.set(element.attributeId, element.optionId)
                }
            } 
        }
    }
    return optionSelections;
}

export const useProductContent = (props) => {
    const { product, place, fromListingPage } = props;
    const dispatch = useDispatch();
    const { getConfigValue } = useConfig();
    const enableToSubscribeValue = getConfigValue("enableToSubscribe");
    const showOutOfStockVariants = getConfigValue("showOutOfStockVariants");
    const [addQty, setAddQty] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { handleToggleDrawer, drawer } = useDrawer();
    const [activeActionField, setActiveActionField] = useState('description')
    const { isSignedIn } = useSelector(state => state.auth);
    const [phoneFieldOpen, setPhoneFieldOpen] = useState(false)
    const { token } = useSelector(state => state.auth);
    const state = useSelector(state => state);
    const { currentLanguage } = useSelector(state => state.shop);
    const [optionSelections, setOptionSelections] = useState(getDefaultOptionSelections(product, fromListingPage));
    const [errorMessage, setErrorMessage] = useState("")
    const allowedOptions = useMemo(
        () => getAllowedOptions(product, optionSelections, showOutOfStockVariants),
        [product, optionSelections, showOutOfStockVariants]
    );
    const handleAddToCart = useCallback(async (product) => {
        try {
            const options = Array.from(optionSelections, ([id, value]) => ({
                optionId: id,
                valueId: String(value)
            }));

            let payload = {
                productId: product.id,
                quantity: addQty
            };

            if (options.length) {
                payload.options = options;
            }
            if (options.length !== allowedOptions.length) {
                if (options.length) {
                    setErrorMessage("Please select size")
                } else {
                    return;
                }
            } else {
                setErrorMessage("");
                setIsAddingToCart(true);
                await dispatch(addProductToCart(payload));
                setIsAddingToCart(false);
                handleToggleDrawer("cart");
            }
        } catch (error) {
            if (error.message == "QuantityError") {
                setErrorMessage("Product is not available")
            } else if (error.message == "InvaliProductSku") {
                setErrorMessage("Invalid product sku")
            }
            setIsAddingToCart(false);
        }

    }, [addQty, optionSelections, errorMessage, setErrorMessage]);
    const quantity = useMemo(() => {
        return product && product.quantity ? product.quantity : 0;
    }, [product]);

    const { __ } = useTranslations();

    const derivedOptionCodes = useMemo(
        () => deriveOptionCodesFromProduct(product),
        [product]
    );

    const [optionCodes] = useState(derivedOptionCodes);

    const handleSelectionChange = useCallback(
        (optionId, selection) => {
            // We must create a new Map here so that React knows that the value
            // of optionSelections has changed.
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
        },
        [optionSelections]
    );

    const variant = useMemo(
        () => isProductConfigurable(product) ? findMatchingVariant({
            optionCodes, 
            optionSelections, 
            variants: product.variants
        }) : false,
        [optionCodes, optionSelections]
    );


    const productData = {
        price: variant ? variant.product.price : product.price
    };
    
    const isAllowedToLeaveReview = useMemo(() => {
        const whoCanLeaveReview = getConfigValue('whoCanLeaveReview');
        if (whoCanLeaveReview == 'loggedInCustomers' && !isSignedIn) {
            return false;
        }
        return true;
    }, [isSignedIn]);
    // Add Product View
    const addProductView = useCallback(async () => {
        const ADD_PRODUCT_VIEW = gql`
          mutation addProductView($productId: String!) {
            addProductView(productId: $productId)
          }
        `;

        const apolloClient = getApolloClient(state);
        const { data } = await apolloClient.mutate({
            mutation: ADD_PRODUCT_VIEW,
            variables: {
                productId: product.id
            },
            fetchPolicy: "no-cache"
        });
    }, [product]);

    useEffect(() => {
        // This talon is called in few other places as well
        if (place == 'productPage') {
            addProductView();
        }
    }, []);
    
    return {
        handleAddToCart,
        __,
        quantity,
        addQty,
        setAddQty,
        allowedOptions,
        optionSelections,
        handleSelectionChange,
        variant,
        productData,
        isAddingToCart,
        enableToSubscribeValue,
        handleToggleDrawer,
        drawer,
        activeActionField,
        setActiveActionField,
        isAllowedToLeaveReview,
        phoneFieldOpen, 
        setPhoneFieldOpen,
        errorMessage
    }
}