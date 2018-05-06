//custom scalar
import { PaginationAmountScalar } from '../customScalars/paginationAmount';
import { MatchesAmountScalar } from '../customScalars/matchesAmount';
import { DateScalar } from '../customScalars/date';
import { HeroIdScalar } from '../customScalars/heroId';
import { resolvers as heroResolvers } from './schema/hero';
import { resolvers as playerResolvers } from './schema/player';
import { resolvers as proDataResolvers } from './schema/proData';
import { merge } from 'lodash';

const rootResolvers = {
  //custom scalar
  PaginationAmount: PaginationAmountScalar,
  MatchesAmount: MatchesAmountScalar,
  CustomDate: DateScalar,
  HeroId: HeroIdScalar,
  Query: {
    allHeroes (_, args, context) {
      return context.Heroes.getAll();
    },
    hero (_, { id }, context) {
      return context.Heroes.getById(id);
    },
    allStats (_, args, context) {
      return context.Heroes.getStats();
    },
    player (_, { account_id }, context) {
      return context.Players.getData(account_id);
    },
    proData (_, args, ctx, info) {
      return {};
    },
    match (_, { match_id }, context) {
      return context.Match.getDetail(match_id);
    }
  }
};

export const resolvers = merge(rootResolvers, heroResolvers, playerResolvers, proDataResolvers);