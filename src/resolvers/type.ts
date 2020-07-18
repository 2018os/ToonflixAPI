import { Context } from '../utils/context';
import { Collection, Webtoon } from './types';

const Type = {
  WebtoonConnection: {
    edges: (parent: Webtoon[]) => parent,
    totalCounts: (_parent: any, _args: any, context: Context) => {
      return context.prisma.webtoon.count();
    },
    pageInfo: async (parent: Webtoon[], _args: any, context: Context) => {
      const startCursor = parent[0].id;
      const endCursor = parent.slice(-1)[0].id;
      const allWebtoons = await context.prisma.webtoon.findMany();
      const lastWebtoonCursor = allWebtoons.slice(-1)[0].id;
      const firstWebtoonCursor = allWebtoons[0].id;
      const hasNextPage = endCursor !== lastWebtoonCursor;
      const hasPreviousPage = startCursor !== firstWebtoonCursor;
      return {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage
      };
    }
  },
  WebtoonEdge: {
    cursor: (parent: Webtoon) => parent.id,
    node: (parent: Webtoon) => parent
  },
  CollectionConnection: {
    edges: (parent: Collection[]) => parent,
    totalCounts: (_parent: any, _args: any, context: Context) => {
      return context.prisma.collection.count();
    },
    pageInfo: async (parent: Collection[], _args: any, context: Context) => {
      const startCursor = parent[0].id;
      const endCursor = parent.slice(-1)[0].id;
      const allCollections = await context.prisma.collection.findMany();
      const lastCollectionCursor = allCollections.slice(-1)[0].id;
      const firstCollectionCursor = allCollections[0].id;
      const hasNextPage = endCursor !== lastCollectionCursor;
      const hasPreviousPage = startCursor !== firstCollectionCursor;
      return {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage
      };
    }
  },
  CollectionEdge: {
    cursor: (parent: Collection) => parent.id,
    node: (parent: Collection) => parent
  }
};

export default Type;
