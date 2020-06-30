import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import path from 'path';

import resolvers from './resolvers';

const typeDefs = fs.readFileSync(
  path.join(__dirname, '/schema', '/schema.graphql'),
  'utf8'
);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
