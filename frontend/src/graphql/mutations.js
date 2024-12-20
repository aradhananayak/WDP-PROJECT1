import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatRoomId: ID!, $content: String!, $senderId: ID!) {
    sendMessage(chatRoomId: $chatRoomId, content: $content, senderId: $senderId) {
      id
      content
      sender {
        id
        username
      }
      sentAt
    }
  }
`;

export const CREATE_CHAT_ROOM = gql`
  mutation CreateChatRoom($name: String!, $participantIds: [ID!]!) {
    createChatRoom(name: $name, participantIds: $participantIds) {
      id
      name
      participants {
        id
        username
      }
    }
  }
`;
