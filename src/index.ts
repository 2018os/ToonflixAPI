import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    info: String
  }
`;

const resolvers = {
  Query: {
    info: () => 'info'
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start({ port: 4000 }, ({ port }) => {
  console.log(`server on ${port} port`);
});
