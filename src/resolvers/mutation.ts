import { ApolloError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AUTH_TOKEN, COLLECTION_ID_UNIT, USER_ID_UNIT } from '../utils/statics';
import { Context } from '../utils/context';
import { getUserId, encode } from '../utils/tools';
import {
  CollectionInputArgument,
  LoginArgument,
  SignupArgument
} from './types';

type webtoonConnect = {
  id: string;
};

async function createCollection(
  _parent: any,
  args: CollectionInputArgument,
  context: Context
) {
  const userId: string = getUserId(context);
  const { title, description, webtoons } = args.input;
  const totalCollection = await context.prisma.collection.count();
  const collectionId = String(COLLECTION_ID_UNIT + totalCollection);
  const encodingId = encode(collectionId);
  const webtoonIds: webtoonConnect[] = webtoons.map((id) => ({ id }));
  const collection = await context.prisma.collection.create({
    data: {
      id: encodingId,
      title,
      description,
      webtoons: {
        connect: webtoonIds
      },
      writer: {
        connect: {
          id: userId
        }
      }
    }
  });
  return collection;
}

async function signup(_parent: any, args: SignupArgument, context: Context) {
  const { name, email, password } = args.input;
  const existed = await context.prisma.user.findOne({ where: { email } });
  if (existed) throw new ApolloError('Already Existing Email', 'INVALID_DATA');
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userCounts = await context.prisma.user.count();
  const id = encode(USER_ID_UNIT + userCounts);
  const user = await context.prisma.user.create({
    data: {
      id,
      name,
      email,
      password: hashedPassword
    }
  });
  const token = jwt.sign({ userId: user.id }, AUTH_TOKEN);
  return {
    token,
    user
  };
}

async function login(_parent: any, args: LoginArgument, context: Context) {
  const { email, password } = args.input;
  const user = await context.prisma.user.findOne({ where: { email } });
  if (!user) throw new ApolloError('Not Found User', 'INVALID_DATA');
  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) throw new ApolloError('Invalid password', 'INVALID_DATA');
  const token = jwt.sign({ userId: user.id }, AUTH_TOKEN);
  return {
    token,
    user
  };
}

export { createCollection, signup, login };
