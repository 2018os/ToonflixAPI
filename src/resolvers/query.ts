import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import {
  Node,
  QueryWebtoonArgs,
  QuerySearchArgs,
  QueryRandomWebtoonsArgs
} from '../generated/graphql';

import { arrayToObjectArrayConverter, encode, shuffle } from '../utils/tools';
import { WEBTOON_ID_UNIT } from '../utils/statics';
import { Context } from '../utils/context';

const Query = {
  genres: (_parent: any, _args: any, context: Context) => {
    return context.prisma.genre.findMany({
      include: {
        webtoons: {
          include: {
            authors: true
          }
        }
      }
    });
  },
  authors: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (_parent, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.author.findMany({
        skip: cursor ? 1 : undefined,
        cursor: cursor
          ? {
              id: encodedCursor || undefined
            }
          : undefined,
        include: {
          webtoons: true
        },
        orderBy: {
          name: args.before ? 'desc' : 'asc'
        }
      });
      return nodes;
    }
  }),
  webtoons: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (_parent, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.webtoon.findMany({
        skip: cursor ? 1 : undefined,
        cursor: cursor
          ? {
              id: encodedCursor || undefined
            }
          : undefined,
        include: {
          authors: true,
          genres: true,
          collections: true
        },
        orderBy: {
          title: args.before ? 'desc' : 'asc'
        }
      });
      return nodes;
    }
  }),
  collections: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (_parent, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.collection.findMany({
        skip: cursor ? 1 : undefined,
        cursor: cursor
          ? {
              id: encodedCursor || undefined
            }
          : undefined,
        include: {
          webtoons: true,
          writer: true
        },
        orderBy: {
          title: args.before ? 'desc' : 'asc'
        }
      });
      return nodes;
    }
  }),
  users: connection({
    cursorFromNode: (node: Node) => node.id,
    nodes: async (_parent, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.user.findMany({
        skip: cursor ? 1 : undefined,
        cursor: cursor
          ? {
              id: encodedCursor || undefined
            }
          : undefined,
        include: {
          collections: {
            include: {
              webtoons: true
            }
          }
        },
        orderBy: {
          id: args.before ? 'desc' : 'asc'
        }
      });
      return nodes;
    }
  }),
  webtoon: async (_parent: any, args: QueryWebtoonArgs, context: Context) => {
    const id = args;
    const webtoon = await context.prisma.webtoon.findOne({
      where: id,
      include: {
        authors: true,
        genres: {
          include: {
            webtoons: true
          }
        },
        collections: {
          include: {
            webtoons: true
          }
        }
      }
    });
    return webtoon;
  },
  randomWebtoons: async (
    _parent: any,
    args: QueryRandomWebtoonsArgs,
    context: Context
  ) => {
    const take = args.take ? args.take : 4;
    const allWebtoonCount = await context.prisma.webtoon.count();
    const webtoonIndex = Array.from(
      Array(allWebtoonCount),
      (_, i) => WEBTOON_ID_UNIT + i
    );
    const shuffledWebtoonIndex = shuffle(webtoonIndex);
    const randomIds = shuffledWebtoonIndex
      .map((id) => ({ id: encode(id) }))
      .slice(0, take);
    return context.prisma.webtoon.findMany({
      where: {
        OR: randomIds
      }
    });
  },
  search: async (_parent: any, args: QuerySearchArgs, context: Context) => {
    const { keyword, where } = args;
    const genreCodes = arrayToObjectArrayConverter(where?.genres, 'code');
    const platforms = arrayToObjectArrayConverter(where?.platforms, 'platform');
    const keywordFilters = keyword
      ? [
          {
            title: {
              contains: keyword
            }
          },
          {
            description: {
              contains: keyword
            }
          }
        ]
      : [];
    const webtoonFilter = {
      isPay: where?.isPay ? where.isPay : undefined,
      isAdult: where?.isAdult ? where.isAdult : undefined,
      isFinish: where?.isFinish ? where.isFinish : undefined,
      genres:
        genreCodes.length > 0
          ? {
              some: {
                OR: genreCodes
              }
            }
          : null,
      AND: [...platforms],
      OR: [...keywordFilters]
    };
    const collectionFilter = {
      OR: [
        ...keywordFilters,
        {
          webtoons: {
            some: {
              OR: [...keywordFilters]
            }
          }
        }
      ]
    };
    const webtoonResult = await context.prisma.webtoon.findMany({
      include: {
        genres: true
      },
      where: webtoonFilter
    });
    const collectionResult = await context.prisma.collection.findMany({
      include: {
        webtoons: {
          include: {
            genres: true,
            authors: true
          }
        }
      },
      where: collectionFilter
    });
    return { webtoonResult, collectionResult };
  }
};

export default Query;
