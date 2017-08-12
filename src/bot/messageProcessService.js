import accountService from '../domain/accountService';
import authService from '../domain/authService';
import generalService from '../domain/generalService';
import linkService from '../domain/linkService';
import transactionService from '../domain/transactionService';
import greetingService from "../domain/greetingService";
import transferService from "../domain/transferService";

const NOUN_BALANCE = 'balance';
const NOUN_EXCHANGE_RATE = 'exchangeRate';
const NOUN_SAVING_RATE = 'savingRate';
const NOUN_WEATHER = 'weather';
const NOUN_TRANSACTION = 'transaction';
const NOUN_HI = 'sayHi';
const NOUN_HOW = 'sayHow';
const NOUN_AUTHENTICATION = 'authentication';
const NOUN_ACCOUNT = 'account';
const NOUN_SAVING = 'saving';

const CONTEXT_SENDING = 'CONTEXT_SENDING';
const CONTEXT_SENDING_SELECT_USER = 'CONTEXT_SENDING_SELECT_USER';
const CONTEXT_SENDING_SELECT_USER_ACCOUNTS = 'CONTEXT_SENDING_SELECT_USER_ACCOUNTS';


const ACTION_SEND = 'send';
const ACTION_INFO = 'info';
const ACTION_LINK = 'link';

class MessageProcessService {
  constructor() {
    this.sessions = { };
    // this.registerUser('hien', '1426782474066386');
  }

  registerUser(username, sender) {
    console.log('register user', sender);
    const auth = new authService();
    return auth.runCommand({
      username,
      sender
    }).then(session => {
      this.sessions[sender] = session;
    });
  }

  process(rawMessage, sender) {
    const message = rawMessage.toLowerCase();
    let currentSession = this.sessions[sender];
    console.log('Current session', this.sessions, rawMessage);
    if (!currentSession || !currentSession.user || !currentSession.user.accounts) {
      const auth = new authService();
      return auth.getData(sender).then(data => {
          if (data && data.user && data.user.profile) {
            currentSession = data;
          } else {
            currentSession = {
              user: { profile: { firstName: 'friend' }},
              context: null
            };
          }

        this.sessions[sender]= currentSession;

        return currentSession;
      }).then(session => this.processSession(session, sender, message));
    }

    return this.processSession(currentSession, sender, message);
  }

  runWeatherCommand(command) {
    return Promise.resolve('I don\'t know what you mean, but the weather is so beautiful now.');
  }

  runCommand(command) {
    switch(command.noun) {
      case NOUN_BALANCE:
      case NOUN_ACCOUNT:
        if (command.action === ACTION_SEND) {
          const account = new transferService();
          return account.runCommand(command);
        } else {
          const account = new accountService();
          return account.runCommand(command);
        }

      case NOUN_TRANSACTION:
        const transaction = new transactionService();
        return transaction.runCommand(command);

      case NOUN_EXCHANGE_RATE:
      case NOUN_SAVING_RATE:
        const general = new generalService();
        return general.runCommand(command);

      case NOUN_AUTHENTICATION:
        const link = new linkService();
        return link.runCommand(command);

      case NOUN_HI:
      case NOUN_HOW:
        const greeting = new greetingService();
        return greeting.runCommand(command);

      default:
        return this.runWeatherCommand(command);
    }
  }

  processSession(currentSession, sender, message) {
    if (currentSession.context &&
      currentSession.context.indexOf(CONTEXT_SENDING) !== -1) {
      const transfer = new transferService();
      return Promise.resolve(transfer.runReplyCommand(message, currentSession));
    }

    const sentences = this.seperatedSentence(message);
    const commands = this.getCommands(sentences, sender);
    const promises = commands.map(command => this.runCommand(command));

    return Promise.all(promises).then(replyMessages => {
      if (replyMessages.length === 1) return replyMessages[0];

      return replyMessages.join('. ');
    });
  }
  getCommands(sentences, sender) {
    let commands = [];
    for(let sentence of sentences) {
      if (sentence && (sentence.length > 2 || sentence === 'hi')) {
        const command = this.getCommand(sentence, sender);
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

  getCommand(sentence, sender) {
    const noun = this.getNouns(sentence);
    const action = this.getAction(sentence);
    const session = this.sessions[sender];
    const { user } = session;

    return { noun, action, user, sentence, session } ;
  }

  getNouns(sentence) {
    if (/(login|log in|signin|sign in|let me in|connect|link account)/.test(sentence)) {
      return NOUN_AUTHENTICATION;
    }

    if (/(balance|current balance|current account|my money|send account|transfer account|send account|transfer|send)/.test(sentence)) {
      return NOUN_BALANCE;
    }

    if (/(exchange rate|usd rate|foreign money rate|converation rate|convert rate)/.test(sentence)) {
      return NOUN_EXCHANGE_RATE;
    }

    if (/(saving rate|saving interest|flexi saving rate|save rate|save interest)/.test(sentence)) {
      return NOUN_SAVING_RATE;
    }

    if (/(accounts|my cards|my accounts|check accounts|what accounts|what is my accounts|what are my accounts|what are accounts|how accounts)/.test(sentence)) {
      return NOUN_ACCOUNT;
    }

    if (/(saving|my saving|my saving|check saving|what saving|what is my saving|what are my saving|what are saving|how saving|savings)/.test(sentence)) {
      return NOUN_SAVING;
    }

    if (/(transaction|my transactions|recent transaction|recent transactions|last payment|top transactions|my transactions|my payment)/.test(sentence)) {
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

    if (/(link)/.test(sentence)) {
      return ACTION_LINK;
    }

    return ACTION_INFO;
  }


  seperatedSentence(message) {
    return message.split(/[.!?]+/);
  }
}

export default MessageProcessService;
