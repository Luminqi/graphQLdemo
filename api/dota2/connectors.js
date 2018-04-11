import fetch from 'node-fetch';
import DataLoader from 'dataloader';

const DOTA2_API_ROOT = 'https://api.opendota.com/api'

// const Dota2 = {
//   getHeroes () {
//     return fetch('https://api.opendota.com/api/heroes')
//     .then(res => res.json());
//   }
// }

export class Dota2Connector {
  constructor () {
    this.loader = new DataLoader(this.fetch.bind(this), {
      batch: false
    });
  }
  fetch (urls) {
    return Promise.all(urls.map((url) => fetch(url).then(res => res.json())));
  }
  get (path) {
    return this.loader.load(DOTA2_API_ROOT + path);
  }
  // get (path) {
  //   return fetch(DOTA2_API_ROOT + path).then(res => res.json());
  // }
}
// export { Dota2 };