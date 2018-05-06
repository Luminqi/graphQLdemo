export const typeDefs = `
  type Chat {
    time: Int
    unit: String
    key: String
    slot: Int
    player_slot: Int
  }
  type DraftTimings {
    order: Int
    pick: Boolean
    active_team: Int
    hero_id: Int
    player_slot: Int
    extra_time: Int
    total_time_taken: Int
  }
  type PermanentBuffs {
    permanent_buff: Int!
    stack_count: Int!
  }
  type RawAndPct {
    raw: Int!
    pct: Float!
  }
  type Benchmarks {
    gold_per_min: RawAndPct
    xp_per_min: RawAndPct
    kills_per_min: RawAndPct
    last_hits_per_min: RawAndPct
    hero_damage_per_min: RawAndPct
    hero_healing_per_min: RawAndPct
    tower_damage: RawAndPct
  }
  type PlayerInMatch {
    match_id: String!
    player_slot: Int
    ability_upgrades_arr: [Int!]
    account_id: Int
    assists: Int
    backpack_Int: Int
    backpack_1: Int
    backpack_2: Int
    camps_stacked: Int
    creeps_stacked: Int
    deaths: Int
    denies: Int
    gold: Int
    gold_per_min: Int
    gold_spent: Int
    hero_damage: Int
    hero_healing: Int
    hero_id: Int
    item_Int: Int
    item_1: Int
    item_2: Int
    item_3: Int
    item_4: Int
    item_5: Int
    kills: Int
    last_hits: Int
    leaver_status: Int
    level: Int
    party_id: Int
    permanent_buffs: [PermanentBuffs]
    pings: Int
    tower_damage: Int
    xp_per_min: Int
    personaname: String
    name: String
    radiant_win: Boolean
    start_time: Int
    duration: Int
    cluster: Int
    lobby_type: Int
    game_mode: Int
    patch: Int
    region: Int
    isRadiant: Boolean
    win: Int
    lose: Int
    total_gold: Int
    total_xp: Int
    kills_per_min: Int
    kda: Int
    abandons: Int
    roshans_killed: Int
    rank_tier: Int
    benchmarks: Benchmarks
  }
  type MatchDetail {
    match_id: String!
    barracks_status_dire: Int
    barracks_status_radiant: Int
    chat: [Chat!]
    cluster: Int
    dire_score: Int
    draft_timings: [DraftTimings!]
    duration: Int
    engine: Int
    first_blood_time: Int
    game_mode: Int
    human_players: Int
    leagueid: Int
    lobby_type: Int
    match_seq_num: Int
    negative_votes: Int
    positive_votes: Int
    radiant_score: Int
    radiant_win: Boolean
    start_time: Int
    tower_status_dire: Int
    tower_status_radiant: Int
    version: Int
    replay_salt: Int
    series_id: Int
    series_type: Int
    skill: Int
    players: [PlayerInMatch!]
    patch: Int
    region: Int
    throw: Int
    loss: Int
    replay_url: String
  }
`;
