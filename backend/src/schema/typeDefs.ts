const gql = require("@apollo/server");

export const typeDefs = `#graphql
type User{
    _id: ID!
    displayName: String!
    email: String!
    password: String!
    authToken: String
    avatarUrl: String
    userCreated: String
}
type Recipe{
    _id: ID!
    name: String!
    shortDescription: String!
    description: String
    ingredients: [Ingredient]
    directions: [Direction]
    author: ID!
    recipeCreated: String
}
type Ingredient{
    name: String!
    quantity: String!
}

input IngredientInput {
    name: String!
    quantity: String!
}

type Direction{
    title: String!
    textContent: String!
    imageUrl: String
}

input DirectionInput {
    title: String!
    textContent: String!
    imageUrl: String
}

type Auth{
    token: ID!
    user: User
}
type Query{
    users: [User]
    user(_id: ID!): User
    recipes(author: ID): [Recipe]
    recipe(_id:ID!): Recipe
}
type Mutation{
    adduser(displayName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!) :Auth
    addrecipe(name: String!, shortDescription: String!, description: String, ingredients: [IngredientInput], directions: [DirectionInput], author: ID!): Recipe
}
`