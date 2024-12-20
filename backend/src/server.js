const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema'); // Import the schema
const db = require('./config/db');
import dotenv from 'dotenv';
import { authenticate } from './utils/auth.js';
dotenv.config();


// Initialize environment variables
require('dotenv').config();

// Connect to MongoDB
db();

const app = express();

// Initialize Apollo Server
const server = new ApolloServer({
  schema, // Use the combined schema
  context: ({ req }) => {
    // Add context if needed, e.g., for authentication
    const token = req.headers.authorization || '';
    return { token };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Start the server
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);


    app.use(express.json());

// Example of a protected route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.id}! You have access to this route.` });
});
  });
}

startServer();
