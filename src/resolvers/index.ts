import Query from './query';
import Mutation from './mutation';
// import Type from './type';

import Author from './author';
import Collection from './collection';
import Webtoon from './webtoon';
import Genre from './genre';
import SearchResult from './search';
import Connection from './connection';

const resolvers = {
  Query,
  Mutation,
  Connection,
  Author,
  Collection,
  Webtoon,
  Genre,
  SearchResultConnection: SearchResult
  // ...Type
};

export default resolvers;
