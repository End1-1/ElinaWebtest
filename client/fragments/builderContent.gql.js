import { gql } from '@apollo/client';

export const BuilderContentFragment = gql`
    fragment BuilderContentFragment on BuilderContent {
        id
        type
        ratio
        direction
        content
        settings
        data
    }
`;
