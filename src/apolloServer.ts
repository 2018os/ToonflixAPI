import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

import logger from '../config/winston';

import { prisma } from './utils/context';

import { AuthDirective, ExpDirective } from './directive';
import resolvers from './resolvers';

const typeDefs = fs.readFileSync(
  path.join(__dirname, '/schema', '/schema.graphql'),
  'utf8'
);

const formatError = (err: any) => {
  const errLog = `GraphQL ${err.originalError}`;
  logger.log('error', errLog);
  return err;
};

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
  formatError,
  debug: false
});

export default server;
