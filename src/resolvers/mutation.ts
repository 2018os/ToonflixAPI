import { Context } from '../utils/context';
import { CollectionInputArgument } from './types';

type webtoonConnect = {
  id: string;
};

async function createCollection(
  _parent: any,
  args: CollectionInputArgument,
  context: Context,
  _info: any
) {
  const { title, description, webtoons } = args.input; // webtoons = ['', '']
  const webtoonIds: webtoonConnect[] = webtoons.map((id) => ({ id }));
  const collection = context.prisma.collection.create({
    data: {
      id: '2', // dynamic
      title,
      description,
      webtoons: {
        connect: webtoonIds
      }
    }
  });
  return collection;
}

export { createCollection };
