import { gql } from '@apollo/client';

export const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    getChatRooms {
      id
      name
      participants {
        id
        username
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($chatRoomId: ID!, $limit: Int, $offset: Int) {
    getMessages(chatRoomId: $chatRoomId, limit: $limit, offset: $offset) {
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
