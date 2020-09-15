import Query from './query';
import Mutation from './mutation';

import Author from './author';
import Collection from './collection';
import Webtoon from './webtoon';
import Genre from './genre';
import SearchResult from './search';
import Connection from './connection';
import User from './user';

const resolvers = {
  Query,
  Mutation,
  Connection,
  Author,
  Collection,
  Webtoon,
  Genre,
  User,
  SearchResultConnection: SearchResult
};

export default resolvers;
