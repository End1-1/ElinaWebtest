import { gql } from '@apollo/client';

export const ProductWithOptionsFragment = gql`
    fragment ProductWithOptionsFragment on Product {
        id
        name
        urlKey
        sku
        price
        discount
        discountType
        discountedPrice
        shortDescription
        description
        quantity
        images {
            path
            roles
            mediaType
        }
        categories
        configurableAttributes {
            attributeId
            label
            type
            values {
                id
                label
                swatch
            }
            showInitiallyOnListings
        }
        averageRating
        reviewCount
        attributes {
            attributeId
            label
            code
            value
        }
        variants {
            product {
                id
                quantity
                price
                discount
                discountType
                discountedPrice
                sku
                images {
                    path
                    roles
                    mediaType
                }
            }
            attributes {
                attributeCode
                attributeId
                optionId
                valueIndex
            }
            isDefault
        }
        pageTitle
        metaDescription
    }
`;
