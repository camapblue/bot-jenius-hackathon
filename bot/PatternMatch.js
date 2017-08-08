/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

// Regular expression
// or: |
// and: .*

var TeamService = require('../service/TeamService');
var LeagueService = require('../service/LeagueService');
var MatchService = require('../service/MatchService');

module.exports = class PatternMatch {
  constructor() {
    this.teamService = new TeamService();
    this.leagueService = new LeagueService();
    this.matchService = new MatchService(this.teamService, this.leagueService);

    let temp = this.teamService.getPatternMatches();
    temp = temp.concat(this.leagueService.getPatternMatches());
    temp = temp.concat(this.matchService.getPatternMatches());
    this.patterns = temp;
  }

  match(userChat) {

    let found = null;
    for (let i = 0; i < this.patterns.length; i += 1) {
      const pattern = this.patterns[i];
      const action = pattern.test(userChat);
      if (action !== null) {
        found = action;
        break;
      }
    }
    if (found !== null) return found(userChat);

    return Promise.resolve("I don't know what you say.");
  }
};
