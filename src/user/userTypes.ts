// userSchema.js

export const userTypesDef = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type UserList {
  users: [User!]!
  hasNext: Boolean!
}
  type Query {
    users(page: Int, limit: Int, sortBy: String): UserList
    user(id: ID!): User
  }

  
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  
  input UpdateUserInput {
    name: String
    email: String
    password: String
  }


  type Mutation {
    createUser(input: CreateUserInput): User
    updateUser(id: ID!, input: UpdateUserInput): User
    deleteUser(id: ID!): User
  }
`;
