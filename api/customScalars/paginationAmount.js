import { GraphQLInputInt } from 'graphql-input-number';

export const PaginationAmountScalar = GraphQLInputInt({
  name: 'PaginationAmountScalar',
  min: 1,
  max: 50
});