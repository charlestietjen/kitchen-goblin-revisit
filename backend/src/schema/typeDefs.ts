const gql = require("@apollo/server");

export const typeDefs = `#graphql
type User{
    _id: ID!
    displayName: String!
    email: String!
    password: String!
    authToken: String!
    avatarUrl: String
}
type Query{
    users: [User]
}
`