import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    allHeros: [Hero]
  }
  type Hero {
    id: String!
    name: String!
    localized_name: String!
    primary_attr: String!
    attack_type: String!
    roles: [String!]!
  }
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
