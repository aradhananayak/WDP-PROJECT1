const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Combine type definitions and resolvers into an executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
