"use strict";

const co = require('co');
const request = require('co-request');
const baseUrl = 'http://bbfootball.net';

var defaultHeaders = { version: '1.3.4' };

function apiToJson(path, method, headers) {
    return co(function* () {
        let res = yield request({
            uri: `${baseUrl}${path}`,
            method: method || 'GET',
            headers: headers || defaultHeaders
        });
        return JSON.parse(res.body);
    })
    .catch(function(err) {
      return `Could not ping ${req} - '${err.message}'`;
    });
}

module.exports = { apiToJson };