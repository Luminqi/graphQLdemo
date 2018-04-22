import { GraphQLInputInt } from 'graphql-input-number';

export const MatchesAmountScalar = GraphQLInputInt({
  name: 'MatchesAmountScalar',
  min: 0,
  max: 50
});