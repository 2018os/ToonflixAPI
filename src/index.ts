import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

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

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
