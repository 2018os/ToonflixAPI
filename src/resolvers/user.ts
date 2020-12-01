import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { User, Node } from '../generated/graphql';

import { Context } from '../utils/context';

export default {
  collectionsConnection: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: User, args, context: Context) => {
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
  })
};
