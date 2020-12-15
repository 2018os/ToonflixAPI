import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { arrayToObjectArrayConverter } from '../utils/tools';
import { Context } from '../utils/context';

import {
  Node,
  QuerySearchArgs,
  SearchResultWebtoonResultArgs,
  SearchResultCollectionResultArgs
} from '../generated/graphql';

type SearchParent = QuerySearchArgs;

export default {
  webtoonResult: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (
      parent: SearchParent,
      args: SearchResultWebtoonResultArgs,
      context: Context
    ) => {
      const cursor = args.after || args.before;
      const { keyword, where } = parent;
      const encodedCursor = cursor && encodeCursor(cursor);
      const genres = where && arrayToObjectArrayConverter(where.genres, 'code');
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
        // TODO:
        // Fix Error "mysql lost connection during query"
        // orderBy: {
        //   title: args.before ? 'desc' : 'asc'
        // },
        where: {
          OR: keyword
            ? [
                { title: { contains: keyword } },
                { description: { contains: keyword } },
                { genres: { some: { name: keyword } } }
              ]
            : undefined,
          platform:
            where?.platforms && where.platforms.length > 0
              ? {
                  in: where.platforms
                }
              : undefined,
          genres: {
            some: {
              OR: genres || []
            }
          },
          isPay: where?.isPay ? where.isPay : undefined,
          isAdult: where?.isAdult ? where.isAdult : undefined,
          isFinish: where?.isFinish ? where.isFinish : undefined
        }
      });
      return nodes;
    }
  }),
  collectionResult: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (
      parent: SearchParent,
      args: SearchResultCollectionResultArgs,
      context: Context
    ) => {
      const cursor = args.after || args.before;
      const { keyword } = parent;
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
        }, // TODO: Customize ordering
        where: keyword
          ? {
              type: {
                not: 'PRIVATE'
              },
              OR: [
                {
                  title: {
                    contains: keyword
                  }
                },
                {
                  description: {
                    contains: keyword
                  }
                },
                {
                  webtoons: {
                    some: {
                      OR: [
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
                    }
                  }
                }
              ]
            }
          : {
              type: {
                not: 'PRIVATE'
              }
            }
      });
      return nodes;
    }
  })
};
