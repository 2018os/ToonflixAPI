import * as Query from './Query';
import Type from './Type';
import * as Mutation from './Mutation';

const resolvers = {
  Query,
  Mutation,
  ...Type
};

export default resolvers;
