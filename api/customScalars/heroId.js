import { GraphQLInputInt } from 'graphql-input-number';

export const HeroIdScalar = GraphQLInputInt({
  name: 'HeroIdScalar',
  min: 1,
  max: 120
});