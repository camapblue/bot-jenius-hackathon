import JeniusService from '../service/JeniusService';

class PatternMatch {
  constructor() {
    this.jeniusService = new JeniusService();

    let temp = this.jeniusService.getPatternMatches();
    this.patterns = temp;
  }

  match(message) {
    let found = null;

    for (let i = 0; i < this.patterns.length; i += 1) {
      const pattern = this.patterns[i];
      const action = pattern.test(message);
      if (action !== null) {
        found = action;
        break;
      }
    }

    if (found) {
      return Promise.resolve(found(message));
    }

    return Promise.resolve("I don't know what you say.");
  }
}

export default PatternMatch
