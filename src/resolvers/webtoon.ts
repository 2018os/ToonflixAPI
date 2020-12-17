import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { Node, Webtoon } from '../generated/graphql';
import { Context } from '../utils/context';

export default {
  authors: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Webtoon, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.author.findMany({
        where: {
          webtoons: {
            some: {
              id: parent.id
            }
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
  collections: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Webtoon, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.collection.findMany({
        where: {
          webtoons: {
            some: {
              id: parent.id
            }
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
  comments: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Webtoon, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.comment.findMany({
        where: {
          webtoonId: parent.id
        },
        include: {
          writer: true
        },
        skip: cursor ? 1 : undefined,
        cursor: cursor
          ? {
              id: encodedCursor || undefined
            }
          : undefined,
        orderBy: {
          createdAt: args.before ? 'asc' : 'desc'
        }
      });
      return nodes;
    }
  })
};
