import { Context } from '../utils/context';

async function webtoons(
  _parent: any,
  _args: any,
  context: Context,
  _info: any
) {
  const allWebtoons = await context.prisma.webtoon.findMany({
    include: {
      authors: true
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

export { webtoons, webtoon, authors };
