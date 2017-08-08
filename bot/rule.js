/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

var utils = require('../utils/utils');

module.exports = class Rule {
  constructor(patterns, replies, isRandom) {
    this.patterns = patterns;
    this.replies = replies;
    this.isRandom = isRandom;
  }

  match(userChat) {
    var found = false;
    this.patterns.every(function(element, index) {
      if (userChat.toLowerCase().trim() === element.toLowerCase()) {
        found = true;
        return false;
      }
      return true;
    });
    if (found) {
      if (this.isRandom) {
        var index = utils.getRandomInt(0, this.replies.length);
        return this.replies[index];
      }
      return this.replies[0];
    }
  }
};
