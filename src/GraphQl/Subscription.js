import gql from "graphql-tag";

export const SUBSCRIPTION_USERS = gql`
    subscription {
        userChange {
            keyType
            data {
                id
                title
                content
                featuredImage
            }
        }
    }
`