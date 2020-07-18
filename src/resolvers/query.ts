import { Context } from '../utils/context';
import { QueryPaginationArgument } from './types';

async function webtoons(
  _parent: any,
  args: QueryPaginationArgument,
  context: Context
) {
  const { take, cursor } = args.page;
  const commonQueryFragment = {
    take,
    include: {
      authors: true,
      genres: true,
      collections: true
    }
  };
  const allWebtoons = cursor
    ? await context.prisma.webtoon.findMany({
        ...commonQueryFragment,
        cursor: {
          id: Buffer.from(cursor, 'base64').toString('ascii')
        },
        skip: 1
      })
    : await context.prisma.webtoon.findMany(commonQueryFragment);
  return allWebtoons;
}

async function collections(
  _parent: any,
  args: QueryPaginationArgument,
  context: Context
) {
  const { take, cursor } = args.page;
  const commonQueryFragment = {
    take,
    include: {
      webtoons: true
    }
  };
  const allWebtoons = cursor
    ? await context.prisma.collection.findMany({
        ...commonQueryFragment,
        cursor: {
          id: Buffer.from(cursor, 'base64').toString('ascii')
        },
        skip: 1
      })
    : await context.prisma.collection.findMany(commonQueryFragment);
  return allWebtoons;
}

export { webtoons, collections };
