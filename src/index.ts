import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import path from 'path';

import { prisma } from './utils/context';
import resolvers from './resolvers';

const typeDefs = fs.readFileSync(
  path.join(__dirname, '/schema', '/schema.graphql'),
  'utf8'
);

const formatError = (err: any) => {
  console.error('--- GraphQL Error ---');
  console.error('Path:', err.path);
  console.error('Message:', err.message);
  console.error('Code:', err.extensions.code);
  console.error('Original Error: ', err.originalError);
  return err;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma
    };
  },
  formatError,
  debug: false
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
