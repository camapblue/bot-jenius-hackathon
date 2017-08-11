const { apiToJson } = require('./api');
const Pattern = require('../model/pattern');

class JeniusService {

  totalNumberOfTeams() {
    return Promise.resolve(12);
  }

  getPatternMatches() {
    const patterns = [];
    patterns.push(new Pattern([/^teams$/],
      () => this.totalNumberOfTeams()
        .then((number) => `Number of TEAMS = ${number}`)
      ));

    return patterns;
  }
}

export default JeniusService;

