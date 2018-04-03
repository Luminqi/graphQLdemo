import { Dota2 } from './connectors';

const resolvers = {
  Query: {
    allHeros () {
      return Dota2.getHeros();
    }
  }
};

export default resolvers;