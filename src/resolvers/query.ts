import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import {
  Node,
  QueryWebtoonArgs,
  QuerySearchArgs,
  QueryRandomWebtoonsArgs,
  QueryUserArgs,
  QueryCollectionsArgs,
  SearchFiltering,
  QueryCollectionArgs
} from '../generated/graphql';

import { arrayToObjectArrayConverter, encode, shuffle } from '../utils/tools';
import { WEBTOON_ID_UNIT } from '../utils/statics';
import { Context } from '../utils/context';

type SearchArgs = {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  keyword?: string | null;
};

type WebtoonSearchArgs = SearchArgs & SearchFiltering;

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
    nodes: async (_parent, args: QueryCollectionsArgs, context: Context) => {
      const { keyword } = args;
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
        },
        where: keyword
          ? {
              NOT: {
                type: 'Private'
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
                      title: {
                        contains: keyword
                      }
                    }
                  }
                }
              ]
            }
          : {
              NOT: {
                type: 'Private'
              }
            }
      });
      return nodes;
    }
  }),
  users: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
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
  user: async (_parent: any, args: QueryUserArgs, context: Context) => {
    const id = args;
    const user = await context.prisma.user.findOne({
      where: id,
      include: {
        collections: {
          include: {
            webtoons: true
          }
        }
      }
    });
    return user;
  },
  collection: async (
    _parent: any,
    args: QueryCollectionArgs,
    context: Context
  ) => {
    const id = args;
    const collection = await context.prisma.collection.findOne({
      where: id,
      include: {
        writer: true,
        webtoons: {
          include: {
            authors: true
          }
        }
      }
    });
    return collection;
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
  search: async (
    parent: any,
    queryArgs: QuerySearchArgs,
    queryContext: Context
  ) => {
    const webtoonArgs = {
      ...(queryArgs.webtoonPaging || {}),
      ...(queryArgs.where || {}),
      keyword: queryArgs.keyword
    };
    const collectionArgs = {
      ...(queryArgs.collectionPaging || {}),
      keyword: queryArgs.keyword
    };
    const webtoonConnection = connection({
      cursorFromNode: (node: Node) => decodeCursor(node.id),
      nodes: async (_parent, args: WebtoonSearchArgs, context: Context) => {
        const cursor = args.after || args.before;
        const { keyword } = args;
        const encodedCursor = cursor && encodeCursor(cursor);
        const filtering = {
          isAdult: args.isAdult ? args.isAdult : undefined,
          isPay: args.isPay ? args.isPay : undefined,
          isFinish: args.isFinish ? args.isFinish : undefined
        };
        const genres = arrayToObjectArrayConverter(args.genres, 'code');
        const platforms = arrayToObjectArrayConverter(
          args.platforms,
          'platform'
        );
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
          },
          where: {
            ...filtering,
            genres: genres.length > 0 ? { some: { OR: genres } } : null,
            AND:
              platforms.length > 0
                ? {
                    OR: platforms
                  }
                : undefined,
            OR: keyword
              ? [
                  { title: { contains: keyword } },
                  { description: { contains: keyword } },
                  { genres: { some: { name: keyword } } }
                ]
              : undefined
          }
        });
        return nodes;
      }
    });
    const collectionConnection = connection({
      cursorFromNode: (node: Node) => decodeCursor(node.id),
      nodes: async (_parent, args: SearchArgs, context: Context) => {
        const cursor = args.after || args.before;
        const { keyword } = args;
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
          }, // TODO: customize
          where: keyword
            ? {
                NOT: {
                  type: 'Private'
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
                NOT: {
                  type: 'Private'
                }
              }
        });
        return nodes;
      }
    });
    return {
      webtoonResult: webtoonConnection(parent, webtoonArgs, queryContext),
      collectionResult: collectionConnection(
        parent,
        collectionArgs,
        queryContext
      )
    };
  }
};

export default Query;
