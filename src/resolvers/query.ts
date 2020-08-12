import { arrayToObjectArrayConverter, encode, shuffle } from '../utils/tools';
import { Context } from '../utils/context';
import {
  CollectionsArgument,
  QueryDetailArgument,
  RandomWebtoonsArgument,
  SearchArgument,
  WebtoonsArgument
} from './types';
import { WEBTOON_ID_UNIT } from '../utils/statics';

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
      },
      writer: true
    }
  };
  const allCollections = cursor
    ? await context.prisma.collection.findMany({
        ...commonQueryFragment,
        cursor: {
          id: cursor
        },
        skip: 1
      })
    : await context.prisma.collection.findMany(commonQueryFragment);
  return allCollections;
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

async function randomWebtoons(
  _parent: any,
  args: RandomWebtoonsArgument,
  context: Context
) {
  const { take } = args;
  const allWebtoonCount = await context.prisma.webtoon.count();
  const webtoonIndex = Array.from(
    Array(allWebtoonCount),
    (_, i) => WEBTOON_ID_UNIT + i
  );
  const shuffledWebtoonIndex = shuffle(webtoonIndex);
  const randomIds = shuffledWebtoonIndex
    .map((id) => ({ id: encode(id) }))
    .slice(0, take);
  return context.prisma.webtoon.findMany({
    where: {
      OR: randomIds
    }
  });
}

async function search(_parent: any, args: SearchArgument, context: Context) {
  const { keyword, where } = args;
  const genreCodes = arrayToObjectArrayConverter(where.genres, 'code');
  const platforms = arrayToObjectArrayConverter(where.platforms, 'platform');
  const keywordFilters = [
    {
      title: {
        contains: keyword
      }
    },
    {
      description: {
        contains: keyword
      }
    }
  ];
  const webtoonFilter = {
    isPay: where.isPay,
    isAdult: where.isAdult,
    isFinish: where.isFinish,
    genres:
      genreCodes.length > 0
        ? {
            some: {
              OR: genreCodes
            }
          }
        : null,
    AND: [...platforms],
    OR: [...keywordFilters]
  };
  const collectionFilter = {
    OR: [
      ...keywordFilters,
      {
        webtoons: {
          some: {
            OR: [...keywordFilters]
          }
        }
      }
    ]
  };
  const webtoonResult = await context.prisma.webtoon.findMany({
    include: {
      genres: true
    },
    where: webtoonFilter
  });
  const collectionResult = await context.prisma.collection.findMany({
    include: {
      webtoons: {
        include: {
          genres: true,
          authors: true
        }
      }
    },
    where: collectionFilter
  });
  return { webtoonResult, collectionResult };
}

export { webtoons, collections, webtoon, randomWebtoons, search };
