import { Context } from '../utils/context';
import { COLLECTION_ID_UNIT } from '../utils/unit';
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
  const { title, description, webtoons } = args.input;
  const collectionId = await context.prisma.collection.count();
  const webtoonIds: webtoonConnect[] = webtoons.map((id) => ({ id }));
  const collection = context.prisma.collection.create({
    data: {
      id: String(collectionId + COLLECTION_ID_UNIT),
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
