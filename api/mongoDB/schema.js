import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    currentUser: User
  }
  type User {
    _id: String
    email: String
    jwt: String
  }
  type Mutation {
    login(email: String!, password: String!): User
    signup(email: String!, password: String!): User
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