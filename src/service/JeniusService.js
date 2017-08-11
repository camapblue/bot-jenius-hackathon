import api from './apiClient';

const Pattern = require('../model/pattern');

class JeniusService {

  _totalNumberOfTeams() {
    return Promise.resolve(12);
  }

  _getCurrentBalance() {
    return api.getCurrentBalance('90010000526').then(data => data.balance);
  }

  getPatternMatches() {
    const patterns = [];

    const team = new Pattern([/^teams$/],
      () => this._totalNumberOfTeams()
        .then((number) => `Number of TEAMS = ${number}`)
    );
    patterns.push(team);

    const currentBalance = new Pattern([/balance/],
      () => this._getCurrentBalance()
        .then(balance => `Your current balance is ${balance}`)
    );

    patterns.push(currentBalance);

    return patterns;
  }
}

export default JeniusService;

