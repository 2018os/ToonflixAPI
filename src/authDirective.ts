import { ApolloError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';

import { Context } from './utils/context';

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (source, args, context: Context, info) => {
      const Authorization = context.req.get('Authorization');
      if (Authorization) {
        const result = await resolve.apply(this, [source, args, context, info]);
        return result;
      }
      throw new ApolloError('No Authentication User', 'NOT_AUTHENTICATION');
    };
  }
}
