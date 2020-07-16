import { Context } from '../utils/context';
import { WebtoonsArgument } from './types';

async function webtoons(
  _parent: any,
  args: WebtoonsArgument,
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

// async function webtoon(_parent: any, args: any, context: Context, _info: any) {
//   const result = await context.prisma.webtoon.findOne({
//     where: {
//       id: args.id
//     }
//   });
//   return result;
// }

// async function authors(_parent: any, _args: any, context: Context, _info: any) {
//   const allAuthors = await context.prisma.author.findMany();
//   return allAuthors;
// }

// async function genres(_parent: any, _args: any, context: Context, _info: any) {
//   const allGenres = await context.prisma.genre.findMany();
//   return allGenres;
// }

// async function collections(
//   _parent: any,
//   _args: any,
//   context: Context,
//   _info: any
// ) {
//   const allCollections = await context.prisma.collection.findMany({
//     include: {
//       webtoons: true
//     }
//   });
//   return allCollections;
// }

// export { webtoons, webtoon, authors, genres, collections };

export { webtoons };
