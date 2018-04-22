import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { AuthDirective } from '../directives/AuthDirective';
import { typeDefs as Hero } from './schema/hero';
import { typeDefs as Player } from './schema/player';

const rootSchema = `
  enum Role {
    ADMIN
    REVIEWER
    USER
    UNKNOWN
  }

  directive @auth(
    requires: Role = USER
  ) on OBJECT | FIELD_DEFINITION

  scalar PaginationAmount
  scalar MatchesAmount
  scalar CustomDate
  scalar HeroId

  type Query {
    allHeroes: [Hero]
    hero(id: HeroId!): Hero
    allStats: [Stats] @cacheControl(maxAge: 120)
    player(account_id: Int!): Player
  }
  
  schema {
    query: Query
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [rootSchema, Hero, Player],
  resolvers,
  schemaDirectives: {
    auth: AuthDirective
  }
});

export default schema;
