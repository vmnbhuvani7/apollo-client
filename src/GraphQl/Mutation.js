import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
    mutation CREATE_NEW_POST($title:String!, $content:String!,$featuredImage:String) {
        createNewPost(
            newPost: {
            title: $title
            content: $content
            featuredImage: $featuredImage
            }
        ) {
            title
            content
            featuredImage
        }
    }
`

export const UPDATE_USER_MUTATION = gql`
    mutation EDIT_POST_BY_ID ($title:String!, $content:String!,$featuredImage:String,$id: ID!) {
        editPostByID(
            updatedPost: {
                title: $title
                content: $content
                featuredImage: $featuredImage
            },
            id:$id
        ) {
            id
            title
            content
            updatedAt
            createdAt
            featuredImage
        }
}
`

export const DELETE = gql`
    mutation DELETE_POST($id: ID!) {
        deletePost(id: $id) {
            id
    }
}
`
