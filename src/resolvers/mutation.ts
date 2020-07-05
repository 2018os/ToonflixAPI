import { Context } from '../utils/context';

async function createCollection(
  _parent: any,
  _args: any,
  context: Context,
  _info: any
) {
  const collection = context.prisma.collection.create({
    data: {
      title: 'Collection3',
      description: 'Test COllection',
      webtoons: {
        connect: [
          {
            id: 1
          },
          {
            id: 3
          }
        ]
      }
    }
  });
  return collection;
}

export { createCollection };
