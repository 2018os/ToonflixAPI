import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { AUTH_TOKEN } from './statics';
import { Context } from './context';

function arrayToObjectArrayConverter(array: any[], key: string): any[] {
  const result = array ? array.map((value) => ({ [key]: value })) : [];
  return result;
}

function getUserId(context: Context): object | string {
  const Authorization = context.req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    return jwt.verify(token, AUTH_TOKEN);
  }
  throw new ApolloError('No Authentication User', 'NOT_AUTHENTICATION');
}
export { arrayToObjectArrayConverter, getUserId };
