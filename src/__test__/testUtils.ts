import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import fs from 'fs';
import path from 'path';

import { prisma } from '../utils/context';
import resolvers from '../resolvers/index';

const typeDefs = fs.readFileSync(
  path.join(__dirname, '../schema', '/schema.graphql'),
  'utf8'
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
});

const server = new ApolloServer({
  schema,
  context: (request) => ({
    ...request,
    prisma
  })
});

const { query, mutate } = createTestClient(server);

export { query, mutate };
