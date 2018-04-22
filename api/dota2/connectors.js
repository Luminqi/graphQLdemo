import fetch from 'node-fetch';
import DataLoader from 'dataloader';

const DOTA2_API_ROOT = 'https://api.opendota.com/api';

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
};