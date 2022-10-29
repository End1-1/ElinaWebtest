import { gql } from '@apollo/client';

export const CustomerFragment = gql`
    fragment CustomerFragment on Customer {
        id
        email
        phone
        language
        firstName
        lastName
        addresses {
            addressId
            firstName
            lastName
            city
            address
            countryCode
            stateCode
            phone
            districtCode
            isDefaultBilling
            isDefaultShipping
        }
        lastActionId
    }
`;
