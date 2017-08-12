import api from '../service/apiClient';
import accountService from '../domain/accountService';
import authService from '../domain/authService';
import generalService from '../domain/generalService';
import transactionService from '../domain/transactionService';
import greetingService from "../domain/greetingService";

const NOUN_BALANCE = 'balance';
const NOUN_EXCHANGE_RATE = 'exchangeRate';
const NOUN_SAVING_RATE = 'savingRate';
const NOUN_SPENDING = 'spending';
const NOUN_WEATHER = 'weather';
const NOUN_TRANSACTION = 'transaction';
const NOUN_HI = 'sayHi';
const NOUN_HOW = 'sayHow';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';

class MessageProcessService {
  constructor() {
    this.user = {
      accountNumber: '90010000526'
    };

    const auth = new authService();
    auth.runCommand({
      username: 'alice'
    }).then(user => {
      this.user = user;
    });
  }


  process(rawMessage) {
    const message = rawMessage.toLowerCase();
    const sentences = this.seperatedSentence(message);
    const commands = this.getCommands(sentences);
    const promises = commands.map(command => this.runCommand(command));

    return Promise.all(promises).then(replyMessages => {
      return replyMessages.join('. ');
    });
  }

  runWeatherCommand(command) {
    return Promise.resolve('I don\'t know what you mean, but the weather is so beautiful now.');
  }

  runCommand(command) {
    switch(command.noun) {
      case NOUN_BALANCE:
        const account = new accountService();
        return account.runCommand(command);

      case NOUN_TRANSACTION:
        const transaction = new transactionService();
        return transaction.runCommand(command);

      case NOUN_EXCHANGE_RATE:
      case NOUN_SAVING_RATE:
        const general = new generalService();
        return general.runCommand(command);

      case NOUN_HI:
      case NOUN_HOW:
        const greeting = new greetingService();
        return greeting.runCommand(command);

      default:
        return this.runWeatherCommand(command);
    }
  }

  getCommands(sentences) {
    let commands = [];
    for(let sentence of sentences) {
      if (sentence && (sentence.length > 2 || sentence === 'hi')) {
        const command = this.getCommand(sentence);
        commands.push(command);
      }
    }

    // filter only 1 WEATHER command
    const weatherCommands = commands.filter(c => c.noun === NOUN_WEATHER);
    if (weatherCommands.length > 0 && weatherCommands.length < commands.length) {
      commands = commands.filter(c => c.noun !== NOUN_WEATHER);
    } else if (weatherCommands.length > 1){
      commands = [weatherCommands[0]];
    }

    return commands;
  }

  getCommand(sentence) {
    const noun = this.getNouns(sentence);
    const action = this.getAction(sentence);
    const user = this.user;

    return { noun, action, user, sentence } ;
  }

  getNouns(sentence) {
    if (/(balance|current balance|current account|my money)/.test(sentence)) {
      return NOUN_BALANCE;
    }

    if (/(exchange rate|usd rate|foreign money rate|converation rate|convert rate)/.test(sentence)) {
      return NOUN_EXCHANGE_RATE;
    }

    if (/(saving rate|saving interest|flexi saving rate|save rate|save interest)/.test(sentence)) {
      return NOUN_SAVING_RATE;
    }

    if (/(transaction|my transactions|last payment|top transactions|my transactions|my payment)/.test(sentence)) {
      return NOUN_TRANSACTION;
    }

    if (/(hi|hello|good morning|good evening|good afternoon|afternoon|morning|evening)/.test(sentence)) {
      return NOUN_HI;
    }

    if (/(how are you|are you ok|are you good|do you have a good day|is everything ok)/.test(sentence)) {
      return NOUN_HOW;
    }

    return NOUN_WEATHER;
  }

  getAction(sentence) {
    if (/(what|why|how)/.test(sentence)) {
      return ACTION_INFO;
    }

    if (/(send|transfer|give)/.test(sentence)) {
      return ACTION_SEND;
    }

    return ACTION_INFO;
  }


  seperatedSentence(message) {
    return message.split(/[.!?]+/);
  }
}

export default MessageProcessService;
