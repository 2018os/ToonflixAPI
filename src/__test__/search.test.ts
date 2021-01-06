import { query } from './testUtils';
import { prisma } from '../utils/context';

import toIncludeObjects from './matchers';

import {
  SEARCH,
  SEARCH_WEBTOONS_WITH_KEYWORD,
  SEARCH_WEBTOONS_WITH_WHERE,
  SEARCH_WEBTOONS_WITH_KEYWORD_AND_WHERE
} from './testSchema';

const KEYWORD = '이야기';
const GENRES = ['action', 'drama'];

expect.extend({
  toIncludeObjects
});

test('Success get search Result', async () => {
  const data: any = await query({
    query: SEARCH
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.count).toEqual(expect.any(Number));
  expect(webtoonResult.pageInfo.startCursor).toEqual(
    webtoonResult.edges[0].node.id
  );
  webtoonResult.edges.forEach((edge: any) => {
    // Test GraphQL Type Node
    expect(edge.node).toEqual({
      id: expect.any(String)
    });
  });
});

test('Success get webtoons with keyword', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD,
    variables: {
      keyword: KEYWORD
    }
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.edges.length).toBeGreaterThan(0);
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

test('Success get webtoons with filterings', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_WHERE,
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

test('Success get webtoons with genres', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_WHERE,
    variables: {
      where: {
        genres: GENRES
      }
    }
  });
  const { webtoonResult } = data.data.search;
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      }
    ]);
  });
});

test('Success get webtoons with platforms', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_WHERE,
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

test('Success get webtoons with filterings + platforms', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_WHERE,
    variables: {
      where: {
        platforms: ['DAUM'],
        isPay: true,
        isAdult: true
      }
    }
  });
  const { webtoonResult } = data.data.search;
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toEqual(
      expect.objectContaining({
        platform: 'DAUM',
        isPay: true,
        isAdult: true
      })
    );
  });
});

test('Success get webtoons with filterings + genres', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_WHERE,
    variables: {
      where: {
        isPay: true,
        isAdult: true,
        genres: GENRES
      }
    }
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.edges.length).toBeGreaterThan(0);
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        isPay: true,
        isAdult: true,
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        isPay: true,
        isAdult: true,
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      }
    ]);
  });
});

test('Success get webtoons with platforms + genres', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_WHERE,
    variables: {
      where: {
        platforms: ['DAUM'],
        genres: GENRES
      }
    }
  });
  const { webtoonResult } = data.data.search;
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        platform: 'DAUM',
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        platform: 'DAUM',
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      }
    ]);
  });
});

test('Success get webtoons with keyword + filterings', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD_AND_WHERE,
    variables: {
      keyword: KEYWORD,
      where: {
        isPay: true
      }
    }
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.edges.length).toBeGreaterThan(0);
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        isPay: true,
        title: expect.stringContaining(KEYWORD)
      },
      {
        isPay: true,
        description: expect.stringContaining(KEYWORD)
      },
      {
        isPay: true,
        genres: expect.arrayContaining([
          expect.objectContaining({
            name: expect.stringContaining(KEYWORD)
          })
        ])
      }
    ]);
  });
});

test('Success get webtoons with keyword + platforms', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD_AND_WHERE,
    variables: {
      keyword: KEYWORD,
      where: {
        platforms: ['DAUM']
      }
    }
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.edges.length).toBeGreaterThan(0);
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        platform: 'DAUM',
        title: expect.stringContaining(KEYWORD)
      },
      {
        platform: 'DAUM',
        description: expect.stringContaining(KEYWORD)
      },
      {
        platform: 'DAUM',
        genres: expect.arrayContaining([
          expect.objectContaining({
            name: expect.stringContaining(KEYWORD)
          })
        ])
      }
    ]);
  });
});

test('Success get webtoons with keyword + genres', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD_AND_WHERE,
    variables: {
      keyword: KEYWORD,
      where: {
        genres: GENRES
      }
    }
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.edges.length).toBeGreaterThan(0);
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        title: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        title: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      },
      {
        description: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        description: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      },
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

test('Success get webtoons with platforms + genres + filterings', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_WHERE,
    variables: {
      where: {
        isPay: true,
        isAdult: true,
        platforms: ['DAUM'],
        genres: GENRES
      }
    }
  });
  const { webtoonResult } = data.data.search;
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        isPay: true,
        isAdult: true,
        platform: 'DAUM',
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        isPay: true,
        isAdult: true,
        platform: 'DAUM',
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      }
    ]);
  });
});

test('Success get webtoons with keyword + genres + filterings', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD_AND_WHERE,
    variables: {
      keyword: KEYWORD,
      where: {
        isFinish: true,
        genres: GENRES
      }
    }
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.edges.length).toBeGreaterThan(0);
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        isFinish: true,
        title: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        isFinish: true,
        title: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      },
      {
        isFinish: true,
        description: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        isFinish: true,
        description: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      },
      {
        isFinish: true,
        genres: expect.arrayContaining([
          expect.objectContaining({
            name: expect.stringContaining(KEYWORD)
          })
        ])
      }
    ]);
  });
});

test('Success get webtoons with keyword + genres + platforms', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD_AND_WHERE,
    variables: {
      keyword: KEYWORD,
      where: {
        platforms: ['DAUM'],
        genres: GENRES
      }
    }
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.edges.length).toBeGreaterThan(0);
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        platform: 'DAUM',
        title: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        platform: 'DAUM',
        title: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      },
      {
        platform: 'DAUM',
        description: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        platform: 'DAUM',
        description: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      },
      {
        platform: 'DAUM',
        genres: expect.arrayContaining([
          expect.objectContaining({
            name: expect.stringContaining(KEYWORD)
          })
        ])
      }
    ]);
  });
});

test('Success get webtoons with keyword + genres + platforms + filterings', async () => {
  const data: any = await query({
    query: SEARCH_WEBTOONS_WITH_KEYWORD_AND_WHERE,
    variables: {
      keyword: KEYWORD,
      where: {
        isFinish: true,
        platforms: ['DAUM'],
        genres: GENRES
      }
    }
  });
  const { webtoonResult } = data.data.search;
  expect(webtoonResult.edges.length).toBeGreaterThan(0);
  webtoonResult.edges.forEach((edge: any) => {
    expect(edge.node).toIncludeObjects([
      {
        isFinish: true,
        platform: 'DAUM',
        title: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        isFinish: true,
        platform: 'DAUM',
        title: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      },
      {
        isFinish: true,
        platform: 'DAUM',
        description: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[0]
          })
        ])
      },
      {
        isFinish: true,
        platform: 'DAUM',
        description: expect.stringContaining(KEYWORD),
        genres: expect.arrayContaining([
          expect.objectContaining({
            code: GENRES[1]
          })
        ])
      },
      {
        isFinish: true,
        platform: 'DAUM',
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
