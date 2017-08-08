/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

const { apiToJson } = require('./api');
const Team = require('../model/team');
const Pattern = require('../model/pattern')

const GET_TEAM_URL = '/service.php?nav=team&info=all';

module.exports = class TeamService {
  constructor() {
    this.teams = [];
  }

  getTeams() {
    if (this.teams.length > 0) return Promise.resolve(this.teams);

    return new Promise((resolve) => {
      apiToJson(GET_TEAM_URL)
      .then((json) => {
        for (let i = 0, len = json.teams.length; i < len; i++) {
          let item = json.teams[i];
          this.teams.push(new Team(item.team_id, item.name, item.stadium, item.city));
        }
        resolve(this.teams);
      });
    })
  }

  totalNumberOfTeams() {
    return this.getTeams()
    .then((teams) => {
      return teams.length;
    });
  }

  getTeamById(teamId) {
    return this.getTeams()
    .then((teams) => {
      var team = null;
      for (var i = 0, len = teams.length; i < len; i++) {
        if (teams[i].teamId === teamId) {
          team = teams[i];
          break;
        }
      }
      return team;
    });
  }

  // pattern matches
  getPatternMatches() {
    const patterns = [];
    patterns.push(new Pattern([/^how many teams.*\?$/], 
      (userchat) => this.totalNumberOfTeams()
      .then((number) => {
        return `Number of TEAMS = ${number}`;
      }))
    )

    return patterns;
  }
};
