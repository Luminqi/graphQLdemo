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