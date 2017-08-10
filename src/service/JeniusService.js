/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

const { apiToJson } = require('./api');
const Pattern = require('../model/pattern');

class JeniusService {

  totalNumberOfTeams() {
    return Promise.resolve(0);
  }

  // pattern matches
  getPatternMatches() {
    const patterns = [];
    patterns.push(new Pattern([/^teams$/],
      () => this.totalNumberOfTeams()
        .then((number) => {
          return `Number of TEAMS = ${number}`;
        }))
    );

    return patterns;
  }
}

export default JeniusService;

