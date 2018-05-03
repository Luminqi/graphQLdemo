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

  input PlayedFilter {
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
    heroes_played(filter: PlayedFilter): [HeroPlayed!]
    peers(filter: PlayedFilter): [Peer!]
    pros(filter: PlayedFilter): [Pro!]
    totals(filter: PlayedFilter): [Total!]
    counts(filter: PlayedFilter): Counts!
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
    match_id: String!
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
    match_id: String!
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
  type HeroPlayed {
    hero_id: Int!
    last_played: Int!
    games: Int!
    win: Int!
    with_games: Int!
    with_win: Int!
    against_games: Int!
    against_win: Int!
  }
  type Peer {
    account_id: Int!
    last_played: Int!
    win: Int!
    games: Int!
    with_win: Int!
    with_games: Int!
    against_win: Int!
    against_games: Int!
    with_gpm_sum: Int!
    with_xpm_sum: Int!
    personaname: String!
    last_login: String!
    avatar: String!
    avatarfull: String!
  }
  type Pro {
    account_id: Int!
    name: String!
    country_code: String!
    fantasy_role: Int!
    team_id: Int!
    team_name: String!
    team_tag: String!
    is_locked: Boolean!
    is_pro: Boolean!
    locked_until: Int!
    steamid: String!
    avatar: String!
    avatarmedium: String!
    avatarfull: String!
    profileurl: String!
    last_login: CustomDate
    full_history_time: CustomDate
    cheese: Int!
    fh_unavailable: Boolean!
    loccountrycode: String!
    last_played: Int!
    win: Int!
    games: Int!
    with_win: Int!
    with_games: Int!
    against_win: Int!
    against_games: Int!
    with_gpm_sum: Int!
    with_xpm_sum: Int!
  }
  type Total {
    field: String!
    n: Int!
    sum: String!
  }
  type Counts {
    leaver_status: LeaverStatus
    game_mode: GameMode
    lobby_type: LobbyType
    lane_role: LaneRole
    region: Region
    patch: Patch
    is_radiant: IsRadiant
  }
  type LeaverStatus {
    not_leave: GamesAndWin
    leave_savely: GamesAndWin
    abandoned: GamesAndWin
  }
  type GameMode {
    unknown: GamesAndWin
    all_pick: GamesAndWin
    captains_mode: GamesAndWin
    random_draft: GamesAndWin
    single_draft: GamesAndWin
    all_random: GamesAndWin
    intro: GamesAndWin
    diretide: GamesAndWin
    reverse_captains_mode: GamesAndWin
    greeviling: GamesAndWin
    tutorial: GamesAndWin
    mid_only: GamesAndWin
    least_played: GamesAndWin
    limited_heroes: GamesAndWin
    compendium_matchmaking: GamesAndWin
    custom: GamesAndWin
    captains_draft: GamesAndWin
    balanced_draft: GamesAndWin
    ability_draft: GamesAndWin
    event: GamesAndWin
    all_random_death_match: GamesAndWin
    solo_mid: GamesAndWin
    all_draft: GamesAndWin
    turbo: GamesAndWin
  }
  type LobbyType {
    normal: GamesAndWin
    practice: GamesAndWin
    tournament: GamesAndWin
    tutorial: GamesAndWin
    coop_bots: GamesAndWin
    ranked_team_mm: GamesAndWin
    ranked_solo_mm: GamesAndWin
    ranked: GamesAndWin
    solo_mid: GamesAndWin
    battle_cup: GamesAndWin
  }
  type LaneRole {
    position1: GamesAndWin
    position2: GamesAndWin
    position3: GamesAndWin
    position4: GamesAndWin
    position5: GamesAndWin
  }
  type Region {
    US_WEST: GamesAndWin
    US_EAST: GamesAndWin
    EUROPE: GamesAndWin
    SINGAPORE: GamesAndWin
    DUBAI: GamesAndWin
    AUSTRALIA: GamesAndWin
    STOCKHOLM: GamesAndWin
    AUSTRIA: GamesAndWin
    BRAZIL: GamesAndWin
    SOUTHAFRICA: GamesAndWin
    PW_TELECOM_SHANGHAI: GamesAndWin
    PW_UNICOM: GamesAndWin
    CHILE: GamesAndWin
    PERU: GamesAndWin
    INDIA: GamesAndWin
    PW_TELECOM_GUANGDONG: GamesAndWin
    PW_TELECOM_ZHEJIANG: GamesAndWin
    JAPAN: GamesAndWin
    PW_TELECOM_WUHAN: GamesAndWin
    PW_UNICOM_TIANJIN: GamesAndWin
  }
  type Patch {
    v6d70: GamesAndWin
    v6d71: GamesAndWin
    v6d72: GamesAndWin
    v6d73: GamesAndWin
    v6d74: GamesAndWin
    v6d75: GamesAndWin
    v6d76: GamesAndWin
    v6d77: GamesAndWin
    v6d78: GamesAndWin
    v6d79: GamesAndWin
    v6d80: GamesAndWin
    v6d81: GamesAndWin
    v6d82: GamesAndWin
    v6d83: GamesAndWin
    v6d84: GamesAndWin
    v6d85: GamesAndWin
    v6d86: GamesAndWin
    v6d87: GamesAndWin
    v6d88: GamesAndWin
    v7d00: GamesAndWin
    v7d01: GamesAndWin
    v7d02: GamesAndWin
    v7d03: GamesAndWin
    v7d04: GamesAndWin
    v7d05: GamesAndWin
    v7d06: GamesAndWin
    v7d07: GamesAndWin
    v7d08: GamesAndWin
    v7d09: GamesAndWin
    v7d10: GamesAndWin
    v7d11: GamesAndWin
    v7d12: GamesAndWin
    v7d13: GamesAndWin
  }
  type IsRadiant {
    f: GamesAndWin
    t: GamesAndWin
  }
  type GamesAndWin {
    games: Int!
    win: Int!
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
      // const filter = args.filter ? args.filter : {};
      return context.Players.getMatches(account_id, filter);
    },
    heroes_played ({ profile: { account_id } }, args, context) {
      const filter = args.filter ? args.filter : undefined;
      return context.Players.getHeroPlayed(account_id, filter);
    },
    peers ({ profile: { account_id } }, args, context) {
      const filter = args.filter ? args.filter : undefined;
      return context.Players.getPeers(account_id, filter);
    },
    pros ({ profile: { account_id } }, args, context) {
      const filter = args.filter ? args.filter : undefined;
      return context.Players.getPros(account_id, filter);
    },
    totals ({ profile: { account_id } }, args, context) {
      const filter = args.filter ? args.filter : undefined;
      return context.Players.getTotals(account_id, filter);
    },
    counts ({ profile: { account_id } }, args, context) {
      const filter = args.filter ? args.filter : undefined;
      return context.Players.getCounts(account_id, filter);
    },
    ratings ({ profile: { account_id } }, args, context) {
      return context.Players.getRatings(account_id);
    },
    rankings ({ profile: { account_id } }, args, context) {
      return context.Players.getRankings(account_id);
    },
  }
};