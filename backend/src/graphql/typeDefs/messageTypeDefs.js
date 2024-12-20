const { gql } = require('apollo-server-express');

const messageTypeDefs = gql`
  type Message {
    id: ID!
    content: String!
    sender: User!
    chatRoom: ChatRoom!
    sentAt: String!
  }

  extend type Query {
    getMessages(chatRoomId: ID!, limit: Int, offset: Int): [Message!]!
  }

  extend type Mutation {
    sendMessage(chatRoomId: ID!, content: String!, senderId: ID!): Message!
  }
`;

module.exports = messageTypeDefs;
