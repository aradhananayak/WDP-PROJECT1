import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHAT_ROOMS } from '../graphql/queries';

const ChatRoomList = ({ onSelectChatRoom }) => {
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS);

  useEffect(() => {
    if (data) {
      console.log('Chat rooms:', data.getChatRooms);
    }
  }, [data]);

  if (loading) return <p>Loading chat rooms...</p>;
  if (error) return <p>Error loading chat rooms: {error.message}</p>;

  return (
    <div>
      <h2>Chat Rooms</h2>
      <ul>
        {data.getChatRooms.map((room) => (
          <li key={room.id} onClick={() => onSelectChatRoom(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
