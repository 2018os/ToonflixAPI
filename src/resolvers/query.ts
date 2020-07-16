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

export { webtoons };
