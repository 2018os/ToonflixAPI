import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import fs from 'fs';
import path from 'path';

import { prisma } from '../utils/context';
import resolvers from './index';

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

const { query } = createTestClient(server);

test('Success get webtoon', async () => {
  const FIND_WEBTOON = gql`
    query($id: ID!) {
      webtoon(id: $id) {
        id
        title
      }
    }
  `;
  const data: any = await query({
    query: FIND_WEBTOON,
    variables: { id: 'MTEwNzc=' }
  });
  expect(data.data.webtoon).toEqual({
    id: 'MTEwNzc=',
    title: '[특집]15인의 반전만화'
  });
});

afterAll(() => {
  prisma.disconnect();
});
