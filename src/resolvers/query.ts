import { Context } from '../utils/context';
import { QueryPaginationArgument, QueryDetailArgument } from './types';

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
          id: cursor
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
      webtoons: {
        include: {
          authors: true,
          genres: true
        }
      }
    }
  };
  const allWebtoons = cursor
    ? await context.prisma.collection.findMany({
        ...commonQueryFragment,
        cursor: {
          id: cursor
        },
        skip: 1
      })
    : await context.prisma.collection.findMany(commonQueryFragment);
  return allWebtoons;
}

async function webtoon(
  _parent: any,
  args: QueryDetailArgument,
  context: Context
) {
  const id = args;
  return context.prisma.webtoon.findOne({
    where: id,
    include: {
      authors: true,
      genres: true,
      collections: {
        include: {
          webtoons: true
        }
      }
    }
  });
}
export { webtoons, collections, webtoon };
