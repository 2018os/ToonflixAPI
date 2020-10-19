import Query from './query';
import Mutation from './mutation';

import Author from './author';
import Collection from './collection';
import Webtoon from './webtoon';
import Genre from './genre';
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
  User
};

export default resolvers;
