import express from 'express';
import morgan from 'morgan';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import server from './apolloServer';

import logger from '../config/winston';

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
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
