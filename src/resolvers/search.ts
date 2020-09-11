import {
  connection,
  decodeCursor,
  encodeCursor
} from 'graphql-connection-resolver';

import { Node, Webtoon, Collection } from '../generated/graphql';

type Result = {
  webtoonResult: Webtoon[];
  collectionResult: Collection[];
};

const getNodes = (
  // TODO: 알고리즘
  data: Node[],
  take: number,
  afterIndex: number,
  beforeIndex: number
): Node[] => {
  let result: Node[] = [];
  if (afterIndex > 0) {
    result = data.slice(afterIndex, take);
  } else if (beforeIndex > 0) {
    result = data.slice(0, take);
  }
  return result;
};

export default {
  webtoonResult: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Result, args) => {
      const { after, before } = args;
      const take = args.first || args.last || 0;
      const { webtoonResult } = parent;
      const encodedAfter = after ? encodeCursor(after) : '';
      const encodedBefore = before ? encodeCursor(before) : '';
      const afterIndex = webtoonResult.findIndex(
        (webtoon) => webtoon.id === encodedAfter
      );
      const beforeIndex = webtoonResult.findIndex(
        (webtoon) => webtoon.id === encodedBefore
      );
      const nodes = getNodes(webtoonResult, take, afterIndex, beforeIndex);
      return nodes;
    }
  }),
  collectionResult: connection({
    cursorFromNode: (node: Node) => decodeCursor(node.id),
    nodes: async (parent: Result, args) => {
      const { after, before } = args;
      const take = args.first || args.last || 0;
      const { collectionResult } = parent;
      const encodedAfter = after ? encodeCursor(after) : '';
      const encodedBefore = before ? encodeCursor(before) : '';
      const afterIndex = collectionResult.findIndex(
        (collection) => collection.id === encodedAfter
      );
      const beforeIndex = collectionResult.findIndex(
        (collection) => collection.id === encodedBefore
      );
      const nodes = getNodes(collectionResult, take, afterIndex, beforeIndex);
      return nodes;
    }
  })
};
