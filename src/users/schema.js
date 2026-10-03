export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type DeleteUserPayload {
        success: Boolean!
        users: [User!]!
    }

    type Mutation {
        addUser(name: String!, email: String!): User!
        updateUser(id: ID!, name: String, email: String): User
        deleteUser(id: ID!): DeleteUserPayload
    }
`;