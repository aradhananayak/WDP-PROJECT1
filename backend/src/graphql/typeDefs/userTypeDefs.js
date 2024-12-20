const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    profilePicture: String
    createdAt: String!
  }

  extend type Query {
    getUsers: [User!]!
  }
`;

module.exports = userTypeDefs;
