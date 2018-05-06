import { transform, mapKeys } from 'lodash';

const game_mode_definition = {
  0: 'unknown',
  1: 'all_pick',
  2: 'captains_mode',
  3: 'random_draft',
  4: 'single_draft',
  5: 'all_random',
  6: 'intro',
  7: 'diretide',
  8: 'reverse_captains_mode',
  9: 'greeviling',
  10: 'tutorial',
  11: 'mid_only',
  12: 'least_played',
  13: 'limited_heroes',
  14: 'compendium_matchmaking',
  15: 'custom',
  16: 'captains_draft',
  17: 'balanced_draft',
  18: 'ability_draft',
  19: 'event',
  20: 'all_random_death_match',
  21: 'solo_mid',
  22: 'all_draft',
  23: 'turbo'
};
const lobby_type_definition = {
  0: 'normal',
  1: 'practice',
  2: 'tournament',
  3: 'tutorial',
  4: 'coop_bots',
  5: 'ranked_team_mm',
  6: 'ranked_solo_mm',
  7: 'ranked',
  8: 'solo_mid',
  9: 'battle_cup'
};
const lane_role_definition = {
  0: 'position1',
  1: 'position2',
  2: 'position3',
  3: 'position4',
  4: 'position5'
};
const region_definition = {
  1: 'US_WEST',
  2: 'US_EAST',
  3: 'EUROPE',
  5: 'SINGAPORE',
  6: 'DUBAI',
  7: 'AUSTRALIA',
  8: 'STOCKHOLM',
  9: 'AUSTRIA',
  10: 'BRAZIL',
  11: 'SOUTHAFRICA',
  12: 'PW_TELECOM_SHANGHAI',
  13: 'PW_UNICOM',
  14: 'CHILE',
  15: 'PERU',
  16: 'INDIA',
  17: 'PW_TELECOM_GUANGDONG',
  18: 'PW_TELECOM_ZHEJIANG',
  19: 'JAPAN',
  20: 'PW_TELECOM_WUHAN',
  25: 'PW_UNICOM_TIANJIN'
};
const patch_definition = {
    0: 'v6d70',
    1: 'v6d71',
    2: 'v6d72',
    3: 'v6d73',
    4: 'v6d74',
    5: 'v6d75',
    6: 'v6d76',
    7: 'v6d77',
    8: 'v6d78',
    9: 'v6d79',
    10: 'v6d80',
    11: 'v6d81',
    12: 'v6d82',
    13: 'v6d83',
    14: 'v6d84',
    15: 'v6d85',
    16: 'v6d86',
    17: 'v6d87',
    18: 'v6d88',
    19: 'v7d00',
    20: 'v7d01',
    21: 'v7d02',
    22: 'v7d03',
    23: 'v7d04',
    24: 'v7d05',
    25: 'v7d06',
    26: 'v7d07',
    27: 'v7d08',
    28: 'v7d09',
    29: 'v7d10',
    30: 'v7d11',
    31: 'v7d12',
    32: 'v7d13'
};
const is_radiant_definition = {
  0: 'f',
  1: 't'
};

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
  //   significant, having, sort, project }) {
  //     const parameters = {
  //       limit, offset, win, patch, game_mode, lobby_type,
  //       region, date, lane_role, hero_id, is_radiant, included_account_id,
  //       excluded_account_id, with_hero_id, against_hero_id,
  //       significant, having, sort, project
  //     };
  //     const query = Object.keys(parameters).filter(key => !!parameters[key] || parameters[key] === 0)
  //       .map(key => `${key}=${parameters[key]}`)
  //       .reduce((prev, cur) =>
  //         prev + '&' + cur
  //       );
  //     console.log(query);
  //     const queryString = query ? `?${query}` : ``;
  //     let matches = await this.connector.get(`/players/${account_id}/matches${queryString}`);
  //     return matches;
  // }
  async _getDataWithFilter (account_id, filter = {limit: 10}, dataType) {
    const defaultFilter = Object.keys(filter).includes('limit') ? {...filter} : {...filter, limit: 10}; 
    const query = Object.keys(defaultFilter)
      .map(key => `${key}=${defaultFilter[key]}`)
      .reduce((prev, cur) =>
        prev + '&' + cur
      );
    console.log(query);
    const queryString = query ? `?${query}` : ``;
    let data = await this.connector.get(`/players/${account_id}/${dataType}${queryString}`);
    return data;
  }
  async getMatches (account_id, filter) {
    let matches = await this._getDataWithFilter(account_id, filter, 'matches');
    return matches;
  }
  async getHeroPlayed (account_id, filter) {
    let heroPlayed =  await this._getDataWithFilter(account_id, filter, 'heroes');
    return heroPlayed;
  }
  async getPeers (account_id, filter) {
    let peers =  await this._getDataWithFilter(account_id, filter, 'peers');
    return peers;
  }
  async getPros (account_id, filter) {
    let pros =  await this._getDataWithFilter(account_id, filter, 'pros');
    return pros;
  }
  async getTotals (account_id, filter) {
    let totals =  await this._getDataWithFilter(account_id, filter, 'totals');
    return totals;
  }
  async getCounts (account_id, filter) {
    let counts = await this._getDataWithFilter(account_id, filter, 'counts');
    let { leaver_status, game_mode, lobby_type, lane_role, region, patch, is_radiant } = counts;
    leaver_status = transform(leaver_status, (result, value, key) => {
      if (key === '0') {
        result.not_leave = value;
      } else if (key === '1') {
        result.leave_savely = value;
      } else {
        result.abandoned = result.abandoned ? result.abandoned + value : value;
      }
    }, {});
    game_mode = mapKeys(game_mode, (value, key) =>
      game_mode_definition[key]
    );
    lobby_type = mapKeys(lobby_type, (value, key) =>
      lobby_type_definition[key]
    );
    lane_role = mapKeys(lane_role, (value, key) =>
      lane_role_definition[key]
    );
    region = mapKeys(region, (value, key) =>
      region_definition[key]
    );
    patch = mapKeys(patch, (value, key) =>
      patch_definition[key]
    );
    is_radiant = mapKeys(is_radiant, (value, key) =>
      is_radiant_definition[key]
    );
    return { leaver_status, game_mode, lobby_type, lane_role, region, patch, is_radiant };
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

export class ProData {
  constructor({ connector }) {
    this.connector = connector;
  }
  async getMatches () {
    let matches = await this.connector.get(`/proMatches`);
    return matches;
  }
  async getPlayers () {
    let players = await this.connector.get(`/proPlayers`);
    return players;
  }
}

export class Match {
  constructor({ connector }) {
    this.connector = connector;
  }
  async getDetail (match_id) {
    let detail = await this.connector.get(`/matches/${match_id}`);
    return detail;
  }
}