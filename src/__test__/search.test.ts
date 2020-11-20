import { query } from './testUtils';
import { prisma } from '../utils/context';

import toIncludeObjects from './matchers';

import {
  SEARCH,
  SEARCH_WEBTOONS_WITH_FILTERING,
  SEARCH_WEBTOONS_WITH_GENRES,
  SEARCH_WEBTOONS_WITH_KEYWORD,
  SEARCH_WEBTOONS_WITH_PLATFORM
} from './testSchema';

const KEYWORD = '헬퍼';

expect.extend({
  toIncludeObjects
});

test('Success get search Result', async () => {
  const data: any = await query({
    query: SEARCH
  });
  const { webtoonResult, collectionResult } = data.data.search;
  expect(webtoonResult.counts).toEqual(expect.any(Number));
  expect(collectionResult.counts).toEqual(expect.any(Number));
  expect(webtoonResult.pageInfo.startCursor).toEqual(
    webtoonResult.edges[0].node.id
  );
  expect(collectionResult.pageInfo.startCursor).toEqual(
    collectionResult.edges[0].node.id
  );
  webtoonResult.edges.forEach((edge: any) => {
    // Test GraphQL Type Node
    expect(edge.node).toEqual({
      id: expect.any(String)
    });
  });
  collectionResult.edges.forEach((edge: any) => {
    expect(edge.node).toEqual({
      id: expect.any(String)
    });
  });
});

test('Success get webtoon with keyword', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD,
    variables: {
      keyword: KEYWORD
    }
  });
  const { webtoonResult } = data.data.search;
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
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

test('Success get webtoon with filterings', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_FILTERING,
    variables: {
      where: {
        isPay: true,
        isAdult: true,
        isFinish: true
      }
    }
  });
  const { webtoonResult } = data.data.search;
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toEqual(
      expect.objectContaining({
        isPay: true,
        isAdult: true,
        isFinish: true
      })
    );
  });
});

test('Success get webtoon with genres', async () => {
  const genres = ['action', 'comic'];
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_GENRES,
    variables: {
      where: {
        genres
      }
    }
  });
  const { webtoonResult } = data.data.search;
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: genres[0]
          })
        ])
      },
      {
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: genres[1]
          })
        ])
      }
    ]);
  });
});

test('Success get webtoon with platform', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_PLATFORM,
    variables: {
      where: {
        platforms: ['DAUM']
      }
    }
  });
  const { webtoonResult } = data.data.search;
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toEqual(
      expect.objectContaining({
        platform: 'DAUM'
      })
    );
  });
});

afterAll(() => {
  prisma.$disconnect();
});
