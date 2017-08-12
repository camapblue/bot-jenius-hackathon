import api from '../service/apiClient';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';

const NOUN_TRANSFER = 'spending';

class TransferService {
  _getCurrentBalance(user) {
    const { profile: { firstName } } = user;

    const account = user.accounts.find(a => a.type === 'PRIMARY_ACCOUNT');
    return Promise.resolve(`Hi ${firstName}, your Active Balance is ${account.balance} ${account.currency} 👍`);
  }

  _extractAccount(sentence) {
    let number = null;
    const numbers = sentence.match(/\d+/);
    if (numbers && numbers.length > 0) {
      number = numbers[0];
    }

    return number;
  }

  _extractNumber(sentence, accounts) {
    const allAcounts = (accounts instanceof Array)? accounts : [accounts];

    let changedSentence = sentence;
    for(const account of allAcounts) {
      changedSentence = changedSentence.replace(account, '');
    }

    let number = null;
    const numbers = changedSentence.match(/\d+/);
    if (numbers && numbers.length > 0) {
      number = numbers[0];
    }

    return number;
  }

  _sendMoney(command) {
    const { user, sentence } = command;
    const { profile: { firstName } } = user;

    const toIndex = sentence.lastIndexOf('to');
    let toAccount = null;
    let amount = null;
    if (toIndex > 0) {
      const accountPart = sentence.substring(toIndex);
      toAccount = this._extractAccount(accountPart);
      amount = this._extractNumber(sentence, toAccount);
    }

    if (amount && toAccount) {
      return Promise.resolve(`Hi ${firstName}, you want to transfer ${amount} to account ${toAccount}, is that correct?`);
    } else {
      return Promise.resolve(`Hi ${firstName}, seem you want to transfer money, but can you add more detail like [send to {account} {amount} idr by current account]? :)`);
    }
  }

  runCommand(command) {
    const { action } = command;

    switch(action) {
      case ACTION_SEND:
        return this._sendMoney(command);
        break;
    }
  }
}

export default TransferService;