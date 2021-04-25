import gql from "graphql-tag";

export const LOAD_USERS = gql`
    query {
        getAllPost {
            id
            title
            content
            featuredImage
            createdAt
            updatedAt
        }
    }
`