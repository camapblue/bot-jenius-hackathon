/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

var { apiToJson } = require('./api');
var League = require('../model/league');
var Pattern = require('../model/pattern')

const GET_LEAGUE_URL = '/service.php?nav=league&info=all';

module.exports = class LeagueService {
  constructor() {
    this.leagues = [];
  }

  getLeagues() {
    if (this.leagues.length > 0) return Promise.resolve(this.leagues);

    return new Promise((resolve) => {
      apiToJson(GET_LEAGUE_URL)
      .then((json) => {
        for (let i = 0, len = json.leagues.length; i < len; i++) {
          const item = json.leagues[i];
          this.leagues.push(new League(item.league_id, item.name));
        }
        resolve(this.leagues);
      });
    });
  }

  totalNumberOfLeagues() {
    return this.getLeagues()
      .then((leagues) => {
        return leagues.length;
      });
  }

  getLeagueById(leagueId) {
    return this.getLeagues()
    .then((leagues) => {
      var league = null;
      for (var i = 0, len = leagues.length; i < len; i++) {
        if (leagues[i].leagueId === leagueId) {
          league = leagues[i];
          break;
        }
      }
      return league;
    });
  }

  // pattern matches
  getPatternMatches() {
    const patterns = [];
    patterns.push(new Pattern([/^how many leagues.*\?$/], 
      () => this.totalNumberOfLeagues()
      .then((number) => {
        return `Number of LEAGUES = ${number}`;
      }))
    );

    return patterns;
  }
};
