import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CHAT_ROOM } from '../graphql/mutations';

const CreateChatRoomForm = ({ users, onChatRoomCreated }) => {
  const [name, setName] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [createChatRoom] = useMutation(CREATE_CHAT_ROOM);

  const handleParticipantToggle = (userId) => {
    if (selectedParticipants.includes(userId)) {
      setSelectedParticipants(selectedParticipants.filter((id) => id !== userId));
    } else {
      setSelectedParticipants([...selectedParticipants, userId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || selectedParticipants.length === 0) {
      alert('Please provide a room name and select participants.');
      return;
    }

    try {
      const { data } = await createChatRoom({
        variables: {
          name,
          participantIds: selectedParticipants,
        },
      });
      onChatRoomCreated(data.createChatRoom);
      setName('');
      setSelectedParticipants([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Chat Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Chat Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <h4>Select Participants:</h4>
          {users.map((user) => (
            <label key={user.id} style={{ display: 'block' }}>
              <input
                type="checkbox"
                value={user.id}
                onChange={() => handleParticipantToggle(user.id)}
              />
              {user.username}
            </label>
          ))}
        </div>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default CreateChatRoomForm;
