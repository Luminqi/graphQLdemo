import { GraphQLScalarType } from 'graphql';

export const DateScalar = new GraphQLScalarType({
  name: 'CustomDate',
  description: 'Date custom scalar type',
  parseValue(value) {
    console.log('from parseValue' + value);
    return new Date(value); // value from the client
  },
  serialize(value) {
    // Value is String in ISO 8601 Format('YYYY-MM-DDTHH:mm:ss.sssZ')
    return Date.parse(value); // value sent to the client
  },
  parseLiteral(ast) {
    console.log('from parseLiteral');
    console.log(ast);
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  }
})