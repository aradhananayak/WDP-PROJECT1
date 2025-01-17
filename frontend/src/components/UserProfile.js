import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <img src={user.profilePicture} alt="Profile" />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
