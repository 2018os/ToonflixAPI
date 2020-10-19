import { gql } from 'apollo-server-express';

import { query } from './testUtils';
import { prisma } from '../utils/context';

const FIND_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

test('Success get webtoon', async () => {
  const data: any = await query({
    query: FIND_USER,
    variables: { id: 'MTAwMDAwMA==' }
  });
  expect(data.data.user).toEqual({
    id: 'MTAwMDAwMA==',
    name: 'KIM'
  });
});

afterAll(() => {
  prisma.disconnect();
});
