import JeniusService from '../service/JeniusService';

class PatternMatch {
  constructor() {
    this.jeniusService = new JeniusService();

    let temp = this.jeniusService.getPatternMatches();
    this.patterns = temp;
  }

  match(userChat) {

    let found = null;
    for (let i = 0; i < this.patterns.length; i += 1) {
      const pattern = this.patterns[i];
      const action = pattern.test(userChat);
      if (action !== null) {
        found = action;
        break;
      }
    }
    if (found !== null) return found(userChat);

    return Promise.resolve("I don't know what you say.");
  }
}

export default PatternMatch
