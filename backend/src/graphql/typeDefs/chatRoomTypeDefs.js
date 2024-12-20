const { gql } = require('apollo-server-express');

const chatRoomTypeDefs = gql`
  type ChatRoom {
    id: ID!
    name: String!
    participants: [User!]!
    createdAt: String!
  }

  extend type Query {
    getChatRooms: [ChatRoom!]!
  }

  extend type Mutation {
    createChatRoom(name: String!, participantIds: [ID!]!): ChatRoom!
  }
`;

module.exports = chatRoomTypeDefs;
