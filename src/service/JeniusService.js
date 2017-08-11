import api from './apiClient';

const Pattern = require('../model/pattern');

class JeniusService {
  constructor() {
    this._patterns = [];

    this.initPatterns();
  }

  _addPattern(regexes, action) {
    const pattern = new Pattern(regexes, () => action);
    this._patterns.push(pattern);
  }

  _totalNumberOfTeams() {
    return Promise.resolve(12);
  }

  _getCurrentBalance() {
    return api.getCurrentBalance('90010000526').then(data => data.balance);
  }

  getPatternMatches() {
    return this._patterns;
  }

  initPatterns() {
    const patterns = [
      {
        regex: [/^teams$/],
        action: this._totalNumberOfTeams()
          .then((number) => `Number of TEAMS = ${number}`)
      },
      {
        regex: [/balance/],
        action: this._getCurrentBalance()
          .then((balance) => `Your current balance: ${balance}`)
      }

    ];

    for(let pattern of patterns) {
      this._addPattern(pattern.regex, pattern.action);
    }
  }
}

export default JeniusService;
