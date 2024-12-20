import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import ChatRoomList from './components/ChatRoomList';
import CreateChatRoomForm from './components/CreateChatRoomForm';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
       <ChatRoomList />
      </div>
    </ApolloProvider>
  );
};

export default App;
