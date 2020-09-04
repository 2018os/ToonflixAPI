import {
  Author,
  Collection,
  FieldArgument,
  FieldConnectionInterface,
  Genre,
  Node,
  QueryConnectionInterface,
  SearchResultConnection,
  Webtoon
} from './types';

const passToFieldConnection = (data: any, args: FieldArgument) => {
  // TODO: Enhance type any
  // TODO: Enhance Naming
  const { cursor, take } = args.page;
  const cursorIndex = cursor
    ? data.findIndex((element: Node) => element.id === cursor) + 1
    : 0;
  return {
    data,
    edges: data.slice(cursorIndex, cursorIndex + take),
    args: args.page
  };
};

const Type = {
  QueryConnection: {
    edges: (root: QueryConnectionInterface) => root.data,
    totalCounts: (root: QueryConnectionInterface) => {
      const { delegate } = root;
      return delegate.count();
    },
    pageInfo: async (root: QueryConnectionInterface) => {
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
    counts: (root: QueryConnectionInterface) => root.data.length
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
    cursor: (root: Node) => root.id,
    node: (root: Node) => root
  },
  Webtoon: {
    authorsConnection: (root: Webtoon, args: FieldArgument) => {
      return passToFieldConnection(root.authors, args);
    },
    collectionsConnection: (root: Webtoon, args: FieldArgument) => {
      return passToFieldConnection(root.collections, args);
    }
  },
  Author: {
    webtoonsConnection: (root: Author, args: FieldArgument) => {
      return passToFieldConnection(root.webtoons, args);
    }
  },
  Collection: {
    webtoonsConnection: (root: Collection, args: FieldArgument) => {
      return passToFieldConnection(root.webtoons, args);
    }
  },
  Genre: {
    webtoonsConnection: (root: Genre, args: FieldArgument) => {
      return passToFieldConnection(root.webtoons, args);
    }
  },
  SearchResultConnection: {
    webtoonResult: (root: SearchResultConnection, args: FieldArgument) => {
      return passToFieldConnection(root.webtoonResult, args);
    },
    collectionResult: (root: SearchResultConnection, args: FieldArgument) => {
      return passToFieldConnection(root.collectionResult, args);
    }
  }
};

export default Type;
