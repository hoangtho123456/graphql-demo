import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { TYPE_DEFS, RESOLVERS } from './src/main-graphql.js';

const server = new ApolloServer({
    typeDefs: [...TYPE_DEFS],
    resolvers: [...RESOLVERS],
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`Server ready at ${url}`);
