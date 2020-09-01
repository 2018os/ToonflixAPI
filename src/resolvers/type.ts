import { Node, ConnectionTypeRootArgument } from './types';

const Type = {
  Connection: {
    edges: (root: ConnectionTypeRootArgument) => root.data,
    totalCounts: (root: ConnectionTypeRootArgument) => {
      const { delegate } = root;
      return delegate.count();
    },
    pageInfo: async (root: ConnectionTypeRootArgument) => {
      const { data, delegate } = root;
      const findAllData = await delegate.findMany();
      const startCursor = data[0].id;
      const endCursor = data.slice(-1)[0].id;
      const lastWebtoonCursor = findAllData.slice(-1)[0].id;
      const firstWebtoonCursor = findAllData[0].id;
      const hasNextPage = endCursor !== lastWebtoonCursor;
      const hasPreviousPage = startCursor !== firstWebtoonCursor;
      return {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage // TODO: FIX ERROR
      };
    },
    counts: (root: ConnectionTypeRootArgument) => root.data.length
  },
  Edge: {
    cursor: (parent: Node) => parent.id,
    node: (parent: Node) => parent
  },
  SearchResultConnection: {
    webtoonResult: (parent: any) => parent.webtoonResult,
    collectionResult: (parent: any) => parent.collectionResult
  }
};

export default Type;
