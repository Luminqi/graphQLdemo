export const typeDefs = `
  type ProData {
    pro_matches: [ProMatches!]!
    pro_players: [ProPlayers!]!
  }

  type ProMatches {
    match_id: String!
    duration: Int!
    start_time: Int!
    radiant_team_id: Int!
    radiant_name: String!
    dire_team_id: Int!
    dire_name: String!
    leagueid: Int!
    league_name: String!
    series_id: Int!
    series_type: Int!
    radiant_score: Int!
    dire_score: Int!
    radiant_win: Boolean!
    radiant: Boolean!
  }

  type ProPlayers {
    account_id: Int!
    steamid: String
    avatar: String
    avatarmedium: String
    avatarfull: String
    profileurl: String
    personaname: String
    last_login: CustomDate
    full_history_time: CustomDate
    cheese: Int
    fh_unavailable: Boolean
    loccountrycode: String
    name: String!
    country_code: String!
    fantasy_role: Int!
    team_id: Int!
    team_name: String
    team_tag: String
    is_locked: Boolean!
    is_pro: Boolean!
    locked_until: Int!
  }
`;

export const resolvers = {
  ProData: {
    pro_matches (_, args, context) {
      return context.ProData.getMatches();
    },
    pro_players (_, args, context) {
      return context.ProData.getPlayers();
    }
  }
};