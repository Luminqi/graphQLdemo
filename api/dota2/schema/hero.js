// const Stats = `
//   type Stats @cacheControl(maxAge: 120) {
//     id: Int!
//     name: String!
//     localized_name: String!
//     primary_attr: String!
//     attack_type: String!
//     img: String!
//     icon: String!
//     base_health: Int!
//     base_health_regen: Float!
//     base_mana: Int!
//     base_mana_regen: Float!
//     base_armor: Int!
//     base_mr: Int!
//     base_attack_min: Int!
//     base_attack_max: Int!
//     base_str: Int!
//     base_agi: Int!
//     base_int: Int!
//     str_gain: Float!
//     agi_gain: Float!
//     int_gain: Float!
//     attack_range: Int!
//     projectile_speed: Int!
//     attack_rate: Float!
//     move_speed: Int!
//     turn_rate: Float!
//     cm_enabled: String!
//     legs: Int!
//   }
// `;

// const Hero = `
//   type Hero {
//     id: Int!
//     name: String!
//     localized_name: String!
//     primary_attr: String!
//     attack_type: String!
//     roles: [String!]! @auth(requires: ADMIN)
//     stats: Stats @cacheControl(maxAge: 120)
//   }
// `;

// export const typeDefs = [Stats, Hero];
export const typeDefs = `
  type Stats @cacheControl(maxAge: 120) {
    id: Int!
    name: String!
    localized_name: String!
    primary_attr: String!
    attack_type: String!
    img: String!
    icon: String!
    base_health: Int!
    base_health_regen: Float!
    base_mana: Int!
    base_mana_regen: Float!
    base_armor: Int!
    base_mr: Int!
    base_attack_min: Int!
    base_attack_max: Int!
    base_str: Int!
    base_agi: Int!
    base_int: Int!
    str_gain: Float!
    agi_gain: Float!
    int_gain: Float!
    attack_range: Int!
    projectile_speed: Int!
    attack_rate: Float!
    move_speed: Int!
    turn_rate: Float!
    cm_enabled: String!
    legs: Int!
  }
  type Hero {
    id: Int!
    name: String!
    localized_name: String!
    primary_attr: String!
    attack_type: String!
    roles: [String!]! @auth(requires: ADMIN)
    stats: Stats @cacheControl(maxAge: 120)
  }
`;

export const resolvers = {
  Hero: {
    stats ({ id }, args, context) {
      return context.Heroes.getStatsById(id);
    }
  }
};