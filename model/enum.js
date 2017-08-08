/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

var Enum = require('enum');
 
const MatchStatus = new Enum({
    'UpComing': 17,
    'FirstHalf': 1,
    'HalfTime': 2,
    'SecondHalf': 3,
    'Finished': 4
})

module.exports = { MatchStatus };