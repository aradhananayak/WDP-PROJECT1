import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { SEND_MESSAGE } from '../graphql/mutations';
import { MESSAGE_ADDED } from '../graphql/subscriptions';

const ChatWindow = ({ chatRoomId, currentUserId }) => {
  const [message, setMessage] = useState('');
  const { data, loading, error, fetchMore } = useQuery(GET_MESSAGES, {
    variables: { chatRoomId, limit: 10, offset: 0 },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { data: subscriptionData } = useSubscription(MESSAGE_ADDED, {
    variables: { chatRoomId },
  });

  useEffect(() => {
    if (subscriptionData) {
      console.log('New message:', subscriptionData.messageAdded);
    }
  }, [subscriptionData]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({ variables: { chatRoomId, content: message, senderId: currentUserId } });
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages: {error.message}</p>;

  return (
    <div>
      <div className="chat-messages">
        {data.getMessages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender.username}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
