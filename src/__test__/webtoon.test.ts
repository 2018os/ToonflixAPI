import { gql } from 'apollo-server-express';

import { query } from './testUtils';
import { prisma } from '../utils/context';

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
