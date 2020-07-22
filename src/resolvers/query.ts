import { Context } from '../utils/context';
import {
  QueryDetailArgument,
  WebtoonsArgument,
  CollectionsArgument
} from './types';
import { WEBTOON_ID_UNIT } from '../utils/unit';

async function webtoons(
  _parent: any,
  args: WebtoonsArgument,
  context: Context
) {
  const { take, cursor } = args.page;
  const { orderBy, field } = args.ordering;
  const commonQueryFragment = {
    take,
    orderBy: {
      [field]: orderBy
    },
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
  args: CollectionsArgument,
  context: Context
) {
  const { take, cursor } = args.page;
  const { orderBy, field } = args.ordering;
  const commonQueryFragment = {
    take,
    orderBy: {
      [field]: orderBy
    },
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
      genres: {
        include: {
          webtoons: true
        }
      },
      collections: {
        include: {
          webtoons: true
        }
      }
    }
  });
}

async function randomWebtoons(_parent: any, _args: any, context: Context) {
  const allWebtoonCount = await context.prisma.webtoon.count();
  const randomIds = [];
  for (let i = 0; i < 6; i += 1) {
    const randomNumber =
      Math.floor(Math.random() * (allWebtoonCount - 0)) + WEBTOON_ID_UNIT;
    const randomId = Buffer.from(String(randomNumber)).toString('base64');
    randomIds.push({ id: randomId });
  }
  return context.prisma.webtoon.findMany({
    where: {
      OR: randomIds
    }
  });
}

export { webtoons, collections, webtoon, randomWebtoons };
