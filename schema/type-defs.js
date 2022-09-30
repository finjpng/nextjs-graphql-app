const { gql } = require('apollo-server')
// import { gql } from "@apollo/client"

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        favoriteMovies: [Movie]

    }
    type Query {
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String! ): Movie!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUsername(input: UpdateUsernameInput!) : User
        deleteUser(id: ID!): User
    }
    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    input CreateUserInput {
        name: String!
        username: String!
        # age: Int = 18 default
        age: Int!
        nationality: Nationality = BRAZIL
      
    }
    input UpdateUsernameInput {
        id: ID!
        newUsername: String!
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
        PHILIPPINES
    }
`

module.exports = {typeDefs}