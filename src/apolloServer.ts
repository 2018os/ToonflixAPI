import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

import { prisma } from './utils/context';

import { AuthDirective, ExpDirective } from './directive';
import resolvers from './resolvers';

const typeDefs = fs.readFileSync(
  path.join(__dirname, '/schema', '/schema.graphql'),
  'utf8'
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  schemaDirectives: {
    auth: AuthDirective,
    exp: ExpDirective
  },
  inheritResolversFromInterfaces: true
});

const server = new ApolloServer({
  schema,
  context: (request) => ({
    ...request,
    prisma
  }),
  debug: false
});

export default server;
