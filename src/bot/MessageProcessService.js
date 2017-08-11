import api from '../service/apiClient';

const NOUN_BALANCE = 'balance';
const NOUN_WEATHER = 'weather';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';

class MessageProcessService {
  process(rawMessage) {
    const message = rawMessage.toLowerCase();
    const sentences = this.seperatedSentence(message);

    let commands = this.getCommands(sentences);

    let promises = [];
    for(let command of commands) {
      promises.push(this.runCommand(command))
    }

    return Promise.all(promises).then(replyMessages => {
      return replyMessages.join('.');
    });
  }

  _getCurrentBalance() {
    return api.getCurrentBalance('90010000526').then(data => data.balance);
  }

  runBalanceCommand(command) {
    switch(command.action) {
      case ACTION_INFO:
        return this._getCurrentBalance();
        break;

      case ACTION_SEND:
        break;
    }
  }

  runWeatherCommand(command) {
    return Promise.resolve('I don\'t know what you mean, but the weather is so beautiful now.');
  }

  runCommand(command) {
    switch(command.noun) {
      case NOUN_BALANCE: {
        return this.runBalanceCommand(command);
      }

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
    let noun = this.getNouns(sentence);
    let action = this.getAction(sentence);
    return { noun, action };
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
