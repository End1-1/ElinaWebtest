import { gql } from '@apollo/client';

export const CartFragment = gql`
    fragment CartFragment on Cart {
        id
        userId
        shopId
        totalQty
        subtotal
        shippingTotal
        discountTotal
        discounts {
            name
            amount
        }
        grandTotal
        couponCode
        items {
            id
            name
            sku
            quantity
            thumbnail
            price
            options {
                optionId
                valueId
            }
            discount
            discountType
            discountedPrice
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
        shippingAddress {
            firstName
            lastName
            address
            city
            countryCode
            addressId
            stateCode
            districtCode
            phone
        }
        billingAddress {
            firstName
            lastName
            address
            city
            countryCode
            addressId
            sameAsShipping
        }
        shippingMethod {
            carrierCode
            rateId
        }
        paymentMethod {
            methodCode
        }
        email
        phone
    }
`;
