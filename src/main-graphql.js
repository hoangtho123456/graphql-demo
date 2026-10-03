import { typeDefs as bookTypeDefs } from './books/schema.js';
import { resolvers as bookResolvers } from './books/resolvers.js';

import { typeDefs as userTypeDefs } from './users/schema.js';
import { resolvers as userResolvers } from './users/resolvers.js';

export const TYPE_DEFS = [bookTypeDefs, userTypeDefs];
export const RESOLVERS = [bookResolvers, userResolvers];
