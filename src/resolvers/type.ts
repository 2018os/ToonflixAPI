import {
  Author,
  ConnectionTypeRootArgument,
  FieldArgument,
  FieldConnectionInterface,
  Node,
  Webtoon
} from './types';

const Type = {
  QueryConnection: {
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
  FieldConnection: {
    edges: (root: FieldConnectionInterface) => root.edges,
    pageInfo: (root: FieldConnectionInterface) => {
      const { data, edges, args } = root;
      const { cursor } = args;
      const startCursor = edges.length > 0 ? edges[0].id : '';
      const endCursor = edges.length > 0 ? edges.slice(-1)[0].id : '';
      return {
        startCursor,
        endCursor,
        hasNextPage: endCursor ? endCursor !== data.slice(-1)[0].id : false,
        hasPreviousPage: cursor ? cursor !== data[0].id : false
      };
    },
    totalCounts: (root: FieldConnectionInterface) => root.data.length
  },
  Edge: {
    cursor: (parent: Node) => parent.id,
    node: (parent: Node) => parent
  },
  Webtoon: {
    authorsConnection: (root: Webtoon, args: FieldArgument) => {
      const { authors } = root;
      const { cursor, take } = args.page;
      const cursorIndex = cursor
        ? authors.findIndex((element: Node) => element.id === cursor) + 1
        : 0;
      return {
        data: authors,
        edges: authors.slice(cursorIndex, cursorIndex + take),
        args: args.page
      };
    },
    collectionsConnection: (root: Webtoon, args: FieldArgument) => {
      const { collections } = root;
      const { cursor, take } = args.page;
      const cursorIndex = cursor
        ? collections.findIndex((element: Node) => element.id === cursor) + 1
        : 0;
      return {
        data: collections,
        edges: collections.slice(cursorIndex, cursorIndex + take),
        args: args.page
      };
    }
  },
  Author: {
    webtoonsConnection: (root: Author, args: FieldArgument) => {
      const { webtoons } = root;
      const { cursor, take } = args.page;
      const cursorIndex = cursor
        ? webtoons.findIndex((element: Node) => element.id === cursor) + 1
        : 0;
      return {
        data: webtoons,
        edges: webtoons.slice(cursorIndex, cursorIndex + take),
        args: args.page
      };
    }
  },
  SearchResultConnection: {
    webtoonResult: (parent: any) => parent.webtoonResult,
    collectionResult: (parent: any) => parent.collectionResult
  }
};

export default Type;
