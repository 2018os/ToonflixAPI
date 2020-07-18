import { Context } from '../utils/context';
import { Collection, Webtoon } from './types';

const Type = {
  WebtoonConnection: {
    edges: (parent: Webtoon[]) => parent,
    totalCounts: (_parent: any, _args: any, context: Context) => {
      return context.prisma.webtoon.count();
    },
    pageInfo: async (parent: Webtoon[], _args: any, context: Context) => {
      const startWebtoon = parent[0];
      const endWebtoon = parent.slice(-1)[0];
      const startCursor = Buffer.from(startWebtoon.id).toString('base64');
      const endCursor = Buffer.from(endWebtoon.id).toString('base64');
      const allWebtoons = await context.prisma.webtoon.findMany();
      const lastWebtoon = allWebtoons.slice(-1)[0];
      const firstWebtoon = allWebtoons[0];
      const hasNextPage =
        endCursor !== Buffer.from(lastWebtoon.id).toString('base64');
      const hasPreviousPage =
        startCursor !== Buffer.from(firstWebtoon.id).toString('base64');
      return {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage
      };
    }
  },
  WebtoonEdge: {
    cursor: (parent: Webtoon) => {
      const encoding = Buffer.from(parent.id).toString('base64');
      return encoding;
    },
    node: (parent: Webtoon) => parent
  },
  CollectionConnection: {
    edges: (parent: Collection[]) => parent,
    totalCounts: (_parent: any, _args: any, context: Context) => {
      return context.prisma.collection.count();
    },
    pageInfo: async (parent: Collection[], _args: any, context: Context) => {
      const startCollection = parent[0];
      const endCollection = parent.slice(-1)[0];
      const startCursor = Buffer.from(startCollection.id).toString('base64');
      const endCursor = Buffer.from(endCollection.id).toString('base64');
      const allCollections = await context.prisma.collection.findMany();
      const lastWebtoon = allCollections.slice(-1)[0];
      const firstWebtoon = allCollections[0];
      const hasNextPage =
        endCursor !== Buffer.from(lastWebtoon.id).toString('base64');
      const hasPreviousPage =
        startCursor !== Buffer.from(firstWebtoon.id).toString('base64');
      return {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage
      };
    }
  },
  CollectionEdge: {
    cursor: (parent: Collection) => {
      const encoding = Buffer.from(parent.id).toString('base64');
      return encoding;
    },
    node: (parent: Collection) => parent
  }
};

export default Type;
