/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

var Enum = require('./enum');

module.exports = class Match {
    constructor(home, away, league, homeGoals, awayGoals, startTime, endTime, status) {
        this.home = home;
        this.away = away;
        this.league = league;
        this.homeGoals = homeGoals;
        this.awayGoals = awayGoals;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = Enum.MatchStatus.get(parseInt(status));
    }
};
