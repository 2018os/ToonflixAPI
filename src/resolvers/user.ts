import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import {
  User,
  Node,
  UserMyCollectionsArgs,
  UserLikedCollectionsArgs
} from '../generated/graphql';

import { Context } from '../utils/context';

export default {
  status: async (parent: User, _args: any, context: Context) => {
    const { id } = parent;
    const commentsCount = context.prisma.comment.count({
      where: {
        writerId: id
      }
    });
    const collectionsCount = context.prisma.collection.count({
      where: {
        writerId: id
      }
    });
    const likedCollectionsCount = context.prisma.collection.count({
      where: {
        likers: {
          some: {
            id
          }
        }
      }
    });
    return {
      commentsCount,
      collectionsCount,
      likedCollectionsCount
    };
  },
  myCollections: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (
      parent: User,
      args: UserMyCollectionsArgs,
      context: Context
    ) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.collection.findMany({
        where: {
          writer: {
            id: parent.id
          }
        },
        skip: cursor ? 1 : undefined,
        cursor: cursor
          ? {
              id: encodedCursor || undefined
            }
          : undefined,
        orderBy: {
          id: args.before ? 'desc' : 'asc'
        }
      });
      return nodes;
    }
  }),
  likedCollections: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (
      parent: User,
      args: UserLikedCollectionsArgs,
      context: Context
    ) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const { where } = args;
      const nodes = await context.prisma.collection.findMany({
        where: {
          likers: {
            some: {
              id: parent.id
            }
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
        },
        skip: cursor ? 1 : undefined,
        cursor: cursor
          ? {
              id: encodedCursor || undefined
            }
          : undefined,
        orderBy: {
          id: args.before ? 'desc' : 'asc'
        }
      });
      return nodes;
    }
  })
};
