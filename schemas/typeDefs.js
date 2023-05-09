const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
_id: ID
username: String
password: String
goals: [Goal]
}

type Goal {
_id: ID
goalText: String
username: String
}

type Auth {
    token: ID!
    user: User
  }

  type Query {
  me: User
  users: [User]
  user:(username: String!): User
  goals: [Goal]
  goal:(_id: ID!): Goal
  }

  type Mutation {
  login(username: String!, password: String!): Auth
  addUser(username: String!, password: String): Auth
  addGoal(goalText: String!): Goal
  }
`;

module.exports = typeDefs;