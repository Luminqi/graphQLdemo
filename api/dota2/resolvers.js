import { Dota2 } from './connectors';

const resolvers = {
  Query: {
    allHeroes (_, args, context) {
      return context.Heroes.getAll();
    },
    hero (_, { id }, context) {
      return context.Heroes.getById(id);
    },
    allStats (_, args, context) {
      return context.Heroes.getStats();
    }
  },
  Hero: {
    stats ({ id }, args, context) {
      return context.Heroes.getStatsById(id);
    }
  }
};

export default resolvers;