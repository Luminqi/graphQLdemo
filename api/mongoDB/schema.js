import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

const typeDefs = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
  type Query {
    currentUser: User
  }
  type User {
    _id: ID
    email: String
    roles: [String!]
    jwt: String
  }
  type Mutation {
    login(email: String!, password: String!): User
    signup(email: String!, password: String!): User
  }
  type Refresh {
    newJWT: String!
    email: String!
  }
  type Subscription {
    updateJWT(email: String!): Refresh
  }
`;
const logger = { log: e => console.log(e) };
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
  allowUndefinedInResolve: false
});

export default schema;