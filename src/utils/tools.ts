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
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const result: any = jwt.verify(token, AUTH_TOKEN);
    if (typeof result === 'object') {
      return result.userId;
    }
    return result;
  }
  return '';
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

function generateCode() {
  const result = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i += 1) {
    result.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
  }
  return result.join('');
}
export {
  arrayToObjectArrayConverter,
  getUserId,
  shuffle,
  encode,
  generateCode
};
