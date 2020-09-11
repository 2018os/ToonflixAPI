import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { AUTH_TOKEN } from './statics';
import { Context } from './context';

function arrayToObjectArrayConverter<T>(
  array: T[] | null | undefined,
  key: string
): any[] {
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

function shuffle<T>(array: T[]): T[] {
  // fisher-yates shuffle
  const result = array;
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function encode(data: string | number): string {
  const enhancedData = typeof data === 'number' ? String(data) : data;
  return Buffer.from(enhancedData).toString('base64');
}

export { arrayToObjectArrayConverter, getUserId, shuffle, encode };
