export class Heroes {
  constructor({ connector }) {
    this.connector = connector;
  }
  async getAll () {
    let heroes = await this.connector.get(`/heroes`);
    return heroes;
  }
  async getById (id) {
    let heroes = await this.getAll();
    return heroes.find(item => item.id === id);
  }
  async getStats () {
    let stats = await this.connector.get(`/heroStats`);
    return stats;
  }
  async getStatsById (id) {
    let stats = await this.getStats();
    return stats.find(item => item.id === id);
  }
}

export class Players {
  constructor({ connector }) {
    this.connector = connector;
  }
  async getData (account_id) {
   let data = await this.connector.get(`/players/${account_id}`);
   return data;
  }
  async getWinLossCount (account_id) {
    let result = await this.connector.get(`/players/${account_id}/wl`);
    return result;
  }
  async getRecentMatches (account_id) {
    let matches = await this.connector.get(`/players/${account_id}/recentMatches`);
    return matches;
  }
  // async getMatches (account_id, { limit = 10, offset, win, patch, game_mode, lobby_type,
  //   region, date, lane_role, hero_id, is_radiant, included_account_id,
  //   excluded_account_id, with_hero_id, against_hero_id,
  //   significant, having, sort, project } = {}) {
  //     const parameters = arguments[1];
  //     const query = Object.keys(parameters).filter(key => !!parameters[key])
  //       .map(key => `${key}=${parameters[key]}`)
  //       .reduce((prev, cur) =>
  //         prev + cur
  //       );
  //     const queryString = query ? `?${query}` : ``;
  //     let matches = await this.connector.get(`/players/${account_id}/matches${queryString}`);
  //     return matches;
  //   }
  async getMatches (account_id, filter = {limit: 10}) {
      const query = Object.keys(filter).filter(key => !!filter[key])
        .map(key => `${key}=${filter[key]}`)
        .reduce((prev, cur) =>
          prev + cur
        );
      console.log(query);
      const queryString = query ? `?${query}` : ``;
      let matches = await this.connector.get(`/players/${account_id}/matches${queryString}`);
      console.log(matches);
      return matches;
    }
  async getRatings (account_id) {
    let ratings = await this.connector.get(`/players/${account_id}/ratings`);
    return ratings;
  }
  async getRankings (account_id) {
    let rankings = await this.connector.get(`/players/${account_id}/rankings`);
    return rankings;
  }
}