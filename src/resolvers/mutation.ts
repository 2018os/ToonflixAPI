import { ApolloError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  AUTH_TOKEN,
  COLLECTION_ID_UNIT,
  USER_ID_UNIT,
  COMMENT_ID_UNIT
} from '../utils/statics';
import { Context } from '../utils/context';
import { getUserId, encode } from '../utils/tools';

import {
  MutationLoginArgs,
  MutationCreateCollectionArgs,
  MutationUpdateCollectionArgs,
  MutationSignupArgs,
  MutationPostCommentArgs,
  MutationLikeCollectionArgs,
  MutationDislikeCollectionArgs,
  MutationDeleteCollectionArgs
} from '../generated/graphql';

const Mutation = {
  createCollection: async (
    _parent: any,
    args: MutationCreateCollectionArgs,
    context: Context
  ) => {
    const userId: string = getUserId(context);
    const { title, description, webtoonIds } = args.input;
    const totalCollection = await context.prisma.collection.count();
    const collectionId = String(COLLECTION_ID_UNIT + totalCollection);
    const encodingId = encode(collectionId);
    const collection = await context.prisma.collection.create({
      data: {
        id: encodingId,
        title,
        description,
        updatedAt: new Date(),
        webtoons: {
          connect: webtoonIds.map((id) => ({ id }))
        },
        writer: {
          connect: {
            id: userId
          }
        }
      }
    });
    return collection;
  },
  updateCollection: async (
    _parent: any,
    args: MutationUpdateCollectionArgs,
    context: Context
  ) => {
    const { title, description } = args.input;
    const webtoonIds =
      args.input.webtoonIds && args.input.webtoonIds.map((id) => ({ id }));
    const collection = await context.prisma.collection.update({
      where: {
        id: args.input.collectionId
      },
      include: {
        writer: true
      },
      data: {
        updatedAt: new Date(),
        title: title || undefined,
        description: description || undefined,
        webtoons: webtoonIds
          ? {
              connect: webtoonIds
            }
          : undefined
      }
    });
    return collection;
  },
  signup: async (_parent: any, args: MutationSignupArgs, context: Context) => {
    const { name, email, password } = args.input;
    const existed = await context.prisma.user.findUnique({ where: { email } });
    if (existed)
      throw new ApolloError('Already Existing Email', 'INVALID_DATA');
    const hashedPassword = bcrypt.hashSync(password, 10);
    const allUserCount = await context.prisma.user.count();
    const allCollectionCount = await context.prisma.collection.count();
    const id = encode(USER_ID_UNIT + allUserCount);
    const collectionId = encode(COLLECTION_ID_UNIT + allCollectionCount);
    // TODO: email authentication
    const user = await context.prisma.user.create({
      data: {
        id,
        name,
        email,
        password: hashedPassword,
        collections: {
          create: {
            id: collectionId,
            title: '좋아요 표시한 작품',
            type: 'PRIVATE',
            description: '',
            updatedAt: new Date()
            // TODO: Enhance date
          }
        }
        // default collection, Read only
      }
    });
    const token = jwt.sign({ userId: user.id }, AUTH_TOKEN);
    return {
      token,
      user
    };
  },
  login: async (_parent: any, args: MutationLoginArgs, context: Context) => {
    const { email, password } = args.input;
    const user = await context.prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApolloError('Not Found User', 'INVALID_DATA');
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) throw new ApolloError('Invalid password', 'INVALID_DATA');
    const token = jwt.sign({ userId: user.id }, AUTH_TOKEN);
    return {
      token,
      user
    };
  },
  postComment: async (
    _parent: any,
    args: MutationPostCommentArgs,
    context: Context
  ) => {
    const userId: string = getUserId(context);
    const { message } = args.input;
    const allCommentCount = await context.prisma.comment.count();
    const id = encode(COMMENT_ID_UNIT + allCommentCount);
    const comment = await context.prisma.comment.create({
      include: {
        writer: true
      },
      data: {
        id,
        writer: {
          connect: { id: userId }
        },
        message,
        webtoon: {
          connect: args.input.webtoonId
            ? {
                id: args.input.webtoonId
              }
            : undefined
        },
        collection: {
          connect: args.input.collectionId
            ? {
                id: args.input.collectionId
              }
            : undefined
        },
        comment: {
          connect: args.input.commentId
            ? {
                id: args.input.commentId
              }
            : undefined
        }
      }
    });
    return comment;
  },
  likeCollection: async (
    _parent: any,
    args: MutationLikeCollectionArgs,
    context: Context
  ) => {
    const userId = getUserId(context);
    return context.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        likedCollections: {
          connect: {
            id: args.collectionId
          }
        }
      }
    });
  },
  dislikeCollection: async (
    _parent: any,
    args: MutationDislikeCollectionArgs,
    context: Context
  ) => {
    const userId = getUserId(context);
    return context.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        likedCollections: {
          disconnect: {
            id: args.collectionId
          }
        }
      }
    });
  },
  deleteCollection: (
    _parent: any,
    args: MutationDeleteCollectionArgs,
    context: Context
  ) => {
    return context.prisma.collection.delete({
      where: {
        id: args.collectionId
      }
    });
  }
};

export default Mutation;
