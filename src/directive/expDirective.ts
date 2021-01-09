import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';

import { Context } from '../utils/context';
import { getUserId } from '../utils/tools';

export default class ExpDirective extends SchemaDirectiveVisitor {
  computeExp(level: number, exp: number): object {
    const { point } = this.args;
    const totalExp = point + exp;
    const maxExp = (Math.floor(level / 10) + 1) * 50;
    const result =
      totalExp >= maxExp
        ? {
            exp: totalExp - maxExp,
            level: {
              increment: 1
            }
          }
        : {
            exp: totalExp
          };
    return result;
  }

  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (source, args, context: Context, info) => {
      const result = await resolve.apply(this, [source, args, context, info]);
      const userId = getUserId(context);
      if (userId && result) {
        const user = await context.prisma.user.findUnique({
          where: {
            id: userId
          }
        });
        if (user) {
          await context.prisma.user.update({
            where: {
              id: userId
            },
            data: this.computeExp(user.level, user.exp)
          });
        }
      }
      return result;
    };
  }
}
