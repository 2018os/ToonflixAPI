import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { Node, Webtoon } from '../generated/graphql';
import { Context } from '../utils/context';

export default {
  authorsConnection: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Webtoon, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const authors = await context.prisma.author.findMany({
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
      return authors;
    }
  }),
  collectionsConnection: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Webtoon, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const authors = await context.prisma.collection.findMany({
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
      return authors;
    }
  })
};
