import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { AUTH_TOKEN } from './statics';
import { Context } from './context';

function arrayToObjectArrayConverter(array: any[], key: string): any[] {
  const result = array ? array.map((value) => ({ [key]: value })) : [];
  return result;
}

function getUserId(context: Context): string {
  const Authorization = context.req.get('Authorization');
  let userId: string;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const result: any = jwt.verify(token, AUTH_TOKEN);
    if (typeof result === 'object') {
      userId = result.userId;
    } else {
      userId = result;
    }
    return userId;
  }
  throw new ApolloError('No Authentication User', 'NOT_AUTHENTICATION');
}

export { arrayToObjectArrayConverter, getUserId };
