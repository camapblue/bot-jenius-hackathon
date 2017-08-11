import api from '../service/apiClient';
import accountService from '../domain/accountService';
import authService from '../domain/authService';

const NOUN_BALANCE = 'balance';
const NOUN_SPENDING = 'spending';
const NOUN_WEATHER = 'weather';

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
      case NOUN_BALANCE: {
        const account = new accountService();
        return account.runCommand(command);
      }
      break;

      default:
        return this.runWeatherCommand(command);
    }
  }

  getCommands(sentences) {
    const commands = [];
    for(let sentence of sentences) {
      if (sentence && sentence.length > 2) {
        const command = this.getCommand(sentence);
        commands.push(command);
      }
    }

    return commands;
  }

  getCommand(sentence) {
    const noun = this.getNouns(sentence);
    const action = this.getAction(sentence);
    const user = this.user;
    return { noun, action, user } ;
  }

  getNouns(sentence) {
    if (/(balance|current balance|current account|my money)/.test(sentence)) {
      return NOUN_BALANCE;
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
