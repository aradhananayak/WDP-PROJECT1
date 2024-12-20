import { gql } from '@apollo/client';

export const MESSAGE_ADDED = gql`
  subscription MessageAdded($chatRoomId: ID!) {
    messageAdded(chatRoomId: $chatRoomId) {
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
