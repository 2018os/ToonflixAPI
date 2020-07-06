import { Context } from '../utils/context';
import { CollectionArgument } from './types';

type webtoonConnect = {
  id: number;
};

async function createCollection(
  _parent: any,
  args: CollectionArgument,
  context: Context,
  _info: any
) {
  const { title, description, webtoons } = args.input;
  const webtoonIds: webtoonConnect[] = webtoons.map((id) => ({ id }));
  const collection = context.prisma.collection.create({
    data: {
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
