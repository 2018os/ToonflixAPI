import { gql } from 'apollo-server-express';

import { query } from './testUtils';
import { prisma } from '../utils/context';

const SEARCH_WEBTOON = gql`
  query($keyword: String, $webtoonPaging: Paging) {
    search(keyword: $keyword, webtoonPaging: $webtoonPaging) {
      webtoonResult {
        counts
        edges {
          node {
            title
          }
        }
      }
    }
  }
`;

const HELPER = [
  {
    node: {
      title: '헬퍼'
    }
  },
  {
    node: {
      title: '헬퍼 2 : 킬베로스'
    }
  }
];

test('Success get webtoon with keyword', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOON,
    variables: {
      keyword: '헬퍼',
      webtoonPaging: {
        first: 2
      }
    }
  });
  expect(data.data.search.webtoonResult.edges).toEqual(HELPER);
});

test('Success get webtoon with keyword and platform', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOON,
    variables: {
      keyword: '헬퍼',
      where: {
        platform: ['NAVER']
      },
      webtoonPaging: {
        first: 2
      }
    }
  });
  expect(data.data.search.webtoonResult.edges).toEqual(HELPER);
  expect(data.data.search.webtoonResult.counts).toEqual(2);
});

afterAll(() => {
  prisma.disconnect();
});
