import express from 'express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import server from './apolloServer';

const app = express();

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
