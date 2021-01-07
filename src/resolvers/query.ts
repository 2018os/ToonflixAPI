import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { getUserId } from '../utils/tools';
import { Context } from '../utils/context';

import {
  Node,
  QueryWebtoonArgs,
  QuerySearchArgs,
  QueryRandomWebtoonsArgs,
  QueryUserArgs,
  QueryCollectionsArgs,
  QueryCollectionArgs
} from '../generated/graphql';

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
      const { where } = args;
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
        where: {
          NOT: {
            type: 'PRIVATE'
          },
          OR: [
            {
              title: {
                contains: where?.keyword || undefined
              }
            },
            {
              description: {
                contains: where?.keyword || undefined
              }
            },
            {
              webtoons: {
                some: {
                  title: {
                    contains: where?.keyword || undefined
                  }
                }
              }
            }
          ],
          webtoons: where?.containWebtoonIds
            ? {
                some: {
                  id: {
                    in: where.containWebtoonIds
                  }
                }
              }
            : undefined
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
    const webtoon = await context.prisma.webtoon.findUnique({
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
    const user = await context.prisma.user.findUnique({
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
    const collection = await context.prisma.collection.findUnique({
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
    const allWebtoon = await context.prisma.webtoon.findMany();
    const randomNumberList = Array.from(Array(take), () =>
      Math.floor(Math.random() * allWebtoon.length)
    );
    const webtoons = randomNumberList.map((value) => allWebtoon[value]);
    return webtoons;
  },
  search: async (_parent: any, args: QuerySearchArgs) => {
    // To resolve search type
    return args;
  },
  me: async (_parent: any, _args: any, context: Context) => {
    const id: string = getUserId(context);
    const user = await context.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        collections: true,
        comments: true
      }
    });
    return user;
  }
};

export default Query;
