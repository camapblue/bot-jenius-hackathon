/*jshint esversion: 6 */
/*jshint -W097 */
/*jslint node: true */

'use strict';

module.exports = class Pattern {
  constructor(patterns, action) {
    this.patterns = patterns;
    this.action = action;
  }

  test(userchat) {
    let found = false;
    for (let i = 0; i < this.patterns.length; i += 1) {
      const regex = this.patterns[i];
      found = regex.test(userchat);
      if (found) break;
    }
    if (found) {
      return this.action;
    }
    return null;
  }
};
