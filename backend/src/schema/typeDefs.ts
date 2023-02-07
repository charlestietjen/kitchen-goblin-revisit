const gql = require("@apollo/server");

export const typeDefs = `#graphql
type User{
    _id: ID!
    displayName: String!
    email: String!
    password: String!
    authToken: String
    avatarUrl: String
}
type Auth{
    token: ID!
    user: User
}
type Query{
    users: [User]
}
type Mutation{
    adduser(displayName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!) :Auth
}
`