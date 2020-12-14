import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { Genre, Node } from '../generated/graphql';

import { Context } from '../utils/context';

export default {
  webtoons: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Genre, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.webtoon.findMany({
        include: {
          genres: true
        },
        where: {
          genres: {
            some: {
              code: parent.code
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
