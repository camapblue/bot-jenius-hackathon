const Rule = require('./rule');
let fs = require('fs');
import PatternMatch from './PatternMatch';

class AIRules {
  constructor(jsonFile) {
    this.patternMatch = new PatternMatch();
    this._initSimpleRule(jsonFile);
  }

  _initSimpleRule(jsonFile) {
    let rulesJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let rules = [];
    for (let i = 0, len = rulesJSON.length; i < len; i++) {
      let item = rulesJSON[i];
      rules.push(new Rule(item.patterns, item.replies, item.random));
    }
    this.rules = rules;
  }

  _detectSimpleRule(message) {
    let found = undefined;
    this.rules.every(function(rule, index) {
      let testMatch = rule.match(message);
      if (testMatch) {
        found = testMatch;
        return false;
      }
      return true;
    });

    return found;
  }

  _detectAdvanceRule(message) {
    return this.patternMatch.match(message);
  }

  match(message) {
    const simpleResule = this._detectSimpleRule(message);
    if (simpleResule) {
      return Promise.resolve(found);
    }

    return this._detectAdvanceRule(message);
  }
}

export default AIRules;
