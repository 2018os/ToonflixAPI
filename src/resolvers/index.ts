import * as Query from './Query';
import Type from './Type';

const resolvers = {
  Query,
  ...Type
};

export default resolvers;
