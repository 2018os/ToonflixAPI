import Query from './query';
import Mutation from './mutation';

import Author from './author';
import Collection from './collection';
import Webtoon from './webtoon';
import Genre from './genre';
import Connection from './connection';
import User from './user';
import Comment from './comment';
import SearchResult from './searchResult';

const resolvers = {
  Query,
  Mutation,
  Connection,
  Author,
  Collection,
  Webtoon,
  Genre,
  User,
  Comment,
  SearchResult
};

export default resolvers;
