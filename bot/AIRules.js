const Rule = require('./rule');
var fs = require('fs');
import PatternMatch from './PatternMatch';

class AIRules {
  constructor(jsonFile) {
    this.patternMatch = new PatternMatch()

    var rulesJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    var rules = [];
    for (var i = 0, len = rulesJSON.length; i < len; i++) {
      var item = rulesJSON[i];
      rules.push(new Rule(item.patterns, item.replies, item.random));
    }
    this.rules = rules;
  }

  match(userChat) {
    var found = '';
    this.rules.every(function(rule, index) {
      var testMatch = rule.match(userChat);
      if (testMatch) {
        found = testMatch;
        return false;
      }
      return true;
    });
    if (found.length > 0) return Promise.resolve(found);

    return this.patternMatch.match(userChat.toLowerCase());
  }
}

export default AIRules;
