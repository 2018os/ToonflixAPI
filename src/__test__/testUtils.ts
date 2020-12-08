import { createTestClient } from 'apollo-server-testing';

import server from '../apolloServer';

const { query, mutate } = createTestClient(server);

export { query, mutate };
