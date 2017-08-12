import api from '../service/apiClient';

const NOUN_HI = 'sayHi';
const NOUN_HOW = 'sayHow';

const bot_name = 'Jeni';

class greetingService {
  constructor() {
    this.greetingInfo = {
      sayHi: [`Hi $name, I am ${bot_name}, how can I help you? (Growing Heart)`,
              `Hi $name, I am ${bot_name}, Jakarta is so beautiful today, anything I can help you? (Green Heart)`,
              `Hi $name, I am ${bot_name}, may I do something for you? (Balloon)(Balloon)(Balloon)`,
              `Hi $name, Hope you have a very good day! May ${bot_name} help you some thing? (Rose)`],
      sayHow: [`Hi $name, Thanks for your asking. ${bot_name} is very good, and always waiting to help you :*`,
        `Hi $name, seem ${bot_name} have a good day! May ${bot_name} help you in something? (Bouquet of Flower)`,
        `Hi $name, Hope you have a very good day! May ${bot_name} do something for you? (Raising One Hand)`,
        `${bot_name} is good, Hope $name have a very good day too! May ${bot_name} do something for you? (Savouring Delicious Food)`]
    }
  }

  _getRandom(max) {
    const top = max ? max : 3;
    return Math.round(Math.random()*top) + 1;
  }

  answerHi(command) {
    const { user: { profile: { lastName } } } = command;
    const fullName = `${lastName}`;

    const { sayHi } = this.greetingInfo;
    const message = sayHi[this._getRandom()].replace('$name', fullName);

    return Promise.resolve(message)
  }

  answerHow(command) {
    const { user: { profile: { lastName } } } = command;
    const fullName = `${lastName}`;

    const { sayHow } = this.greetingInfo;
    const message = sayHow[this._getRandom()].replace('$name', fullName);

    return Promise.resolve(message)
  }

  runCommand(command) {
    const { noun } = command;
    switch(noun) {
      case NOUN_HI:
        return this.answerHi(command);
        break;

      case NOUN_HOW:
        return this.answerHow(command);
        break;

    }
  }
}

export default greetingService;