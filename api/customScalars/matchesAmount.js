import { GraphQLInputInt } from 'graphql-input-number';

export const MatchesAmountScalar = GraphQLInputInt({
  name: 'MatchesAmountScalar',
  min: 1,
  max: 50
});