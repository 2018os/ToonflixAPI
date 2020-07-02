import { Context } from '../utils/context';
import { WebtoonsArgument } from './types';

async function webtoons(
  _parent: any,
  args: WebtoonsArgument,
  context: Context,
  _info: any
) {
  const { pagination, filter } = args.input;
  const allWebtoons = await context.prisma.webtoon.findMany({
    include: {
      authors: true
    },
    skip: pagination.first,
    take: pagination.offset,
    where: {
      title: {
        contains: filter.title
      }
    }
  });
  return allWebtoons;
}

async function webtoon(_parent: any, args: any, context: Context, _info: any) {
  const result = await context.prisma.webtoon.findOne({
    where: {
      id: Number(args.id)
    }
  });
  return result;
}

async function authors(_parent: any, _args: any, context: Context, _info: any) {
  const allAuthors = await context.prisma.author.findMany();
  return allAuthors;
}

async function genres(_parent: any, _args: any, context: Context, _info: any) {
  const allGenres = await context.prisma.genre.findMany();
  return allGenres;
}

export { webtoons, webtoon, authors, genres };
