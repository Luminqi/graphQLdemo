import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { AuthDirective } from '../directives/AuthDirective';
import { typeDefs as Hero } from './schema/hero';
import { typeDefs as Player } from './schema/player';
import { typeDefs as ProData } from './schema/proData';
import { typeDefs as Match } from './schema/match';

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
    proData: ProData
    match(match_id: String!): MatchDetail
  }
  
  schema {
    query: Query
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [rootSchema, Hero, Player, ProData, Match],
  resolvers,
  schemaDirectives: {
    auth: AuthDirective
  }
});

export default schema;
