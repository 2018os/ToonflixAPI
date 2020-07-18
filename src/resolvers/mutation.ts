import { Context } from '../utils/context';
import { COLLECTION_ID_UNIT } from '../utils/unit';
import { CollectionInputArgument } from './types';

type webtoonConnect = {
  id: string;
};

async function createCollection(
  _parent: any,
  args: CollectionInputArgument,
  context: Context
) {
  const { title, description, webtoons } = args.input;
  const totalCollection = await context.prisma.collection.count();
  const collectionId = String(COLLECTION_ID_UNIT + totalCollection);
  const encodingId = Buffer.from(collectionId).toString('base64');
  const webtoonIds: webtoonConnect[] = webtoons.map((id) => ({ id }));
  const collection = context.prisma.collection.create({
    data: {
      id: encodingId,
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
