import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { Node, Comment } from '../generated/graphql';
import { Context } from '../utils/context';

export default {
  comments: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Comment, args, context: Context) => {
      const cursor = args.after || args.before;
      const encodedCursor = cursor && encodeCursor(cursor);
      const nodes = await context.prisma.comment.findMany({
        where: {
          commentId: parent.id
        },
        include: {
          writer: true,
          comment: true,
          comments: true
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
