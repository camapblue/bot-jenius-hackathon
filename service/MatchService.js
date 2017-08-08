/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

const co = require('co');
var { apiToJson } = require('./api');
var League = require('../model/league');
var TeamService = require('./TeamService');
var LeagueService = require('./LeagueService');
var Match = require('../model/match');
var Enum = require('../model/enum');
const Pattern = require('../model/pattern')

const GET_MATCH_URL = '/service.php?nav=match&info=all';

module.exports = class MatchService {
  constructor(teamService, leagueService) {
    this.teamService = teamService;
    this.leagueService = leagueService;
    this.matches = [];
  }

  getMatches() {
    if (this.matches.length > 0) return Promise.resolve(this.matches);

    const that = this;
    return co(function* () {
      const [t, l, json] = yield [that.teamService.getTeams(),
        that.leagueService.getLeagues(),
        apiToJson(GET_MATCH_URL)];
      if (json.matches === undefined) return [];

      for (var i = 0, len = json.matches.length; i < len; i++) {
        const item = json.matches[i];
        const [home, away, league] = yield [that.teamService.getTeamById(item.home_team_id),
          that.teamService.getTeamById(item.away_team_id),
          that.leagueService.getLeagueById(item.league_id)];
        if (home !== null && away !== null && league !== null) {
          that.matches.push(new Match(home, away, league,
                item.home_goals,
                item.away_goals,
                item.first_time,
                item.finish_time,
                item.status));
        }
      }
      return that.matches;
    });
  }

  totalNumberOfMatches() {
    return this.getMatches()
    .then((matches) => {
      return matches.length;
    });
  }

  showLiveMatches() {
    return this.getMatches()
    .then((matches) => {
      var liveMatches = "";
      for (var i = 0, len = matches.length; i < len; i += 1) {
        const match = matches[i];
        if (match.status === Enum.MatchStatus.Finished) {
          liveMatches += (i + 1) + ". " + match.home.name + " " + match.homeGoals + " - " + match.awayGoals + " " + match.away.name + " in " + match.league.name;
        } else {
          liveMatches += (i + 1) + ". " + match.home.name + " vs. " + match.away.name + " in " + match.league.name;
        }
        if (i < len - 1) {
          liveMatches += "\n";
        }
      }
      return liveMatches;
    });
  }

  // pattern matches
  getPatternMatches() {
    const patterns = [];
    patterns.push(new Pattern([/^how many matches.*\?$/],
      (userchat) => this.totalNumberOfMatches()
      .then((number) => {
        return `Number of MATCHES = ${number}`;
      }))
    );

    patterns.push(new Pattern([/^show live match$/, /^live match$/],
      (userchat) => this.showLiveMatches())
    );

    return patterns;
  }
};
