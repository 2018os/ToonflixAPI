import { Context } from './context';

const resolvers = {
  Query: {
    webtoons: async (
      _parent: any,
      _args: any,
      context: Context,
      _info: any
    ) => {
      const allWebtoons = await context.prisma.webtoon.findMany();
      return allWebtoons;
    },
    authors: async (_parent: any, _args: any, context: Context, _info: any) => {
      const allAuthors = await context.prisma.author.findMany();
      return allAuthors;
    }
  }
};

export default resolvers;
