import * as Query from './query';
import Type from './type';
import * as Mutation from './mutation';

const resolvers = {
  Query,
  Mutation,
  ...Type
};

export default resolvers;
