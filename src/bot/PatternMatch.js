import JeniusService from '../service/JeniusService';

class PatternMatch {
  constructor() {
    this.jeniusService = new JeniusService();

    let temp = this.jeniusService.getPatternMatches();
    this.patterns = temp;
  }

  _detectPattern(message) {
    let found = null;

    for (let i = 0; i < this.patterns.length; i += 1) {
      const pattern = this.patterns[i];
      const action = pattern.test(message);
      if (action !== null) {
        found = action;
        break;
      }
    }

    return found;
  }

  match(message) {
    const found = this._detectPattern(message);

    if (found) {
      return Promise.resolve(found(message));
    }

    return Promise.resolve("Hmm I am not sure I can understand you.");
  }
}

export default PatternMatch
