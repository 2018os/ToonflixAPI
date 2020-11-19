import { gql } from 'apollo-server-express';

import { query } from './testUtils';
import { prisma } from '../utils/context';

const KEYWORD = '헬퍼';

expect.extend({
  toObjectContain: (received, properties) => {
    let pass = false;
    properties.forEach((property: any) => {
      const match = expect.objectContaining(property);
      if (match.asymmetricMatch(received)) {
        pass = true;
      }
    });
    if (pass) {
      return {
        message: () =>
          `expect ${JSON.stringify(received)} is containing property`,
        pass: true
      };
    }
    return {
      message: () =>
        `expect ${JSON.stringify(received)} is not containing property`,
      pass: false
    };
  }
});

const SEARCH_WEBTOONS_WITH_KEYWORD = gql`
  query($keyword: String) {
    search(keyword: $keyword, webtoonPaging: { first: 10 }) {
      webtoonResult {
        counts
        pageInfo {
          startCursor
        }
        edges {
          node {
            id
            title
            description
            genres {
              name
            }
          }
        }
      }
    }
  }
`;

test('Success get webtoon with keyword', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD,
    variables: {
      keyword: KEYWORD
    }
  });
  const { webtoonResult } = data.data.search;

  expect(webtoonResult.counts <= 3).toBeTruthy();

  expect(webtoonResult.pageInfo.startCursor).toEqual(
    webtoonResult.edges[0].node.id
  );

  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toObjectContain([
      { title: expect.stringContaining(KEYWORD) },
      { description: expect.stringContaining(KEYWORD) },
      {
        genres: expect.arrayContaining([
          expect.objectContaining({
            name: expect.stringContaining(KEYWORD)
          })
        ])
      }
    ]);
  });
});

afterAll(() => {
  prisma.$disconnect();
});
