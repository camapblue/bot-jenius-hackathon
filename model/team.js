/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

module.exports = class Team {
    constructor(teamId, name, stadium, city) {
        this.teamId = teamId;
        this.name = name;
        this.stadium = stadium;
        this.city = city;
    }
};
