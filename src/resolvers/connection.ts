import { Context } from '../utils/context';
import { ConnectionResolvers } from '../generated/graphql';

export default {
  __resolveType: () => null,
  counts: (parent) => parent.edges?.length,
  // TODO: Enhance counts
  totalCounts: (_parent, _args, context: Context, info: any) => {
    const type = info.path.typename;
    switch (type) {
      case 'WebtoonAuthorsConnection': {
        return context.prisma.author.count();
      }
      case 'WebtoonCollectionsConnection': {
        return context.prisma.collection.count();
      }
      case 'AuthorWebtoonsConnection': {
        return context.prisma.webtoon.count();
      }
      case 'GenreWebtoonsConnection': {
        return context.prisma.webtoon.count();
      }
      case 'WebtoonConnection': {
        return context.prisma.webtoon.count();
      }
      case 'AuthorConnection': {
        return context.prisma.author.count();
      }
      case 'CollectionConnection': {
        return context.prisma.collection.count();
      }
      case 'CollectionWebtoonsConnection': {
        return context.prisma.webtoon.count();
      }
      case 'UserConnection': {
        return context.prisma.user.count();
      }
      case 'SearchResultWebtoonsConnection': {
        return context.prisma.webtoon.count();
      }
      case 'SearchResultCollectionsConnection': {
        return context.prisma.collection.count();
      }
      default:
        return 0;
    }
  }
} as ConnectionResolvers;
