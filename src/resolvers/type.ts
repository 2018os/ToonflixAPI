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
      const findAllData = await delegate.findMany({
        orderBy: {
          title: 'asc'
        }
      });
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
  Webtoon: {
    authorsConnection: (root: any, args: any) => {
      const { authors } = root;
      const { cursor, take } = args.page;
      const cursorIndex = cursor
        ? authors.findIndex((element: Node) => element.id === cursor) + 1
        : 0;
      return {
        data: authors,
        edges: authors.slice(cursorIndex, take),
        args: args.page
      };
    }
  },
  FieldConnection: {
    edges: (root: any) => root.edges,
    pageInfo: (root: any) => {
      const { data, edges, args } = root;
      const { cursor: startCursor } = args;
      const endCursor = edges.slice(-1)[0] ? edges.slice(-1)[0].id : '';
      return {
        startCursor,
        endCursor,
        hasNextPage: endCursor !== data.slice(-1)[0].id,
        hasPreviousPage: startCursor !== data[0].id
      };
    },
    totalCounts: (root: any) => root.data.length
  },
  SearchResultConnection: {
    webtoonResult: (parent: any) => parent.webtoonResult,
    collectionResult: (parent: any) => parent.collectionResult
  }
};

export default Type;
