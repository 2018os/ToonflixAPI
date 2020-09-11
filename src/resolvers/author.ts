import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { Author, Node } from '../generated/graphql';

import { Context } from '../utils/context';

export default {
  webtoonsConnection: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Author, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.webtoon.findMany({
        where: {
          authors: {
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
  })
};
