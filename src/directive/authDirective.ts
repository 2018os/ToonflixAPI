import { ApolloError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';

import { Context } from '../utils/context';
import { getUserId } from '../utils/tools';

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (source, args, context: Context, info) => {
      const userId = getUserId(context);
      const user = await context.prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      if (user) {
        // update authentication & authorization
        const result = await resolve.apply(this, [source, args, context, info]);
        return result;
      }
      throw new ApolloError('No Authentication User', 'NOT_AUTHENTICATION');
    };
  }
}
