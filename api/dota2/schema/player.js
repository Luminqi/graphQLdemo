export const typeDefs = `
  input MatchFilter {
    limit: MatchesAmount
    offset: Int
    win: Int
    patch: Int
    game_mode: Int
    lobby_type: Int
    region: Int
    date: Int
    lane_role: Int
    hero_id: Int
    is_radiant: Int
    included_account_id: Int
    excluded_account_id: Int
    with_hero_id: Int
    against_hero_id: Int
    significant: Int
    having: Int
    sort: String
    project: String
  }
  
  type Player {
    tracked_until: String!
    solo_competitive_rank: String!
    competitive_rank: String!
    rank_tier: Int!
    leaderboard_rank: Int!
    mmr_estimate: Mmr!
    profile: Profile!
    winlosscount: WinLoss!
    recentMatches: [Match!]
    matches(filter: MatchFilter): [Match!]
    ratings: [Rating!]
    rankings: [Ranking!]
  }
  
  type Mmr {
    estimate: Int!
    stdDev: Int!
    n: Int!
  }

  type Profile {
    account_id: Int!
    personaname: String!
    name: String!
    cheese: Int!
    steamid: String!
    avatar: String!
    avatarmedium: String!
    avatarfull: String!
    profileurl: String!
    last_login: String!
    loccountrycode: String!
  }

  type WinLoss {
    win: Int!
    lose: Int!
  }

  type Match {
    match_id: Int!
    player_slot: Int!
    radiant_win: Boolean!
    duration: Int!
    game_mode: Int!
    lobby_type: Int!
    hero_id: Int!
    start_time: Int!
    version: Int
    kills: Int!
    deaths: Int!
    assists: Int!
    skill: Int!
    lane: Int
    lane_role: Int
    is_roaming: Boolean
    cluster: Int
    leaver_status: Int!
    party_size: Int
  }
  type Rating {
    account_id: Int!
    match_id: Int!
    solo_competitive_rank: Int
    competitive_rank: Int
    time: CustomDate!
  }
  type Ranking {
    hero_id: Int!
    score: Int!
    percent_rank: Float!
    card: Int!
  }
`;

export const resolvers = {
  Player: {
    winlosscount ({ profile: { account_id } }, args, context) {
      return context.Players.getWinLossCount(account_id);
    },
    recentMatches  ({ profile: { account_id } }, args, context) {
      return context.Players.getRecentMatches(account_id);
    },
    matches ({ profile: { account_id } }, args, context) {
      const filter = args.filter ? args.filter : undefined;
      return context.Players.getMatches(account_id, filter);
    },
    ratings ({ profile: { account_id } }, args, context) {
      return context.Players.getRatings(account_id);
    },
    rankings ({ profile: { account_id } }, args, context) {
      return context.Players.getRankings(account_id);
    },
  }
};