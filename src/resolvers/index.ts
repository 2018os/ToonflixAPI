import * as Query from './Query';
import Type from './Type';
// import * as Mutation from './Mutation';

const resolvers = {
  Query,
  ...Type
  // Mutation
};

export default resolvers;
