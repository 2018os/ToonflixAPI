import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import logger from '../config/winston';

import { prisma } from './utils/context';
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

const app = express();
app.use(
  morgan('common', {
    stream: {
      write: (str: string) => {
        logger.log('info', str);
      }
    }
  })
);

server.applyMiddleware({ app });

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
