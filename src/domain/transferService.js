import api from '../service/apiClient';
import { fbTemplate } from 'claudia-bot-builder';
const ACTION_SEND = 'send';
const ACTION_INFO = 'info';

const CONTEXT_SENDING = 'TRANSFER_MONEY';
const CONTEXT_SENDING_SELECT_USER = 'CONTEXT_SENDING_SELECT_USER';
const CONTEXT_SENDING_SELECT_USER_ACCOUNTS = 'CONTEXT_SENDING_SELECT_USER_ACCOUNTS';
const CONTEXT_SENDING_YES = 'YES';
const CONTEXT_SENDING_NO = 'NO';

class TransferService {
  _getCurrentBalance(user) {
    const { profile: { firstName } } = user;

    const account = user.accounts.find(a => a.type === 'PRIMARY_ACCOUNT');
    return Promise.resolve(`Hi ${firstName}, your Active Balance is ${account.balance} ${account.currency} 👍`);
  }

  _getNumber(sentence) {
    const numbers = sentence.match(/\d+/);
    return numbers;
  }
  _extractAccount(sentence) {
    let number = null;
    const numbers = sentence.match(/\d+/);
    if (numbers && numbers.length > 0) {
      number = numbers[0];
    }

    return number;
  }

  _extractName(sentence) {
    const words = sentence.split(' ');
    if (words.length > 1)
    {
      return words[1];
    }

    return null;
  }

  _extractNumber(sentence, accounts) {
    const allAcounts = (accounts instanceof Array)? accounts : [accounts];
    console.log('changed sentence', changedSentence);

    let changedSentence = sentence;
    for(const account of allAcounts) {
      changedSentence = changedSentence.replace(account, '');
    }

    let number = null;
    const numbers = changedSentence.match(/\d+/);
    if (numbers && numbers.length > 0) {
      number = numbers[0];
    }

    return Number(number);
  }

  _sendMoney(command) {
    const { user, sentence, session } = command;
    const { profile: { firstName } } = user;

    const toIndex = sentence.lastIndexOf('to');
    let toAccount = null;
    let amount = null;
    const numbers = this._getNumber(sentence);
    if (toIndex > 0 && numbers.length > 1) {
      const accountPart = sentence.substring(toIndex);
      toAccount = this._extractAccount(accountPart);
      amount = this._extractNumber(sentence, toAccount);

      if (amount && toAccount) {
        const fromAccount = '90010011012';
        const message = `Hi ${firstName}, you want to transfer ${amount} to account ${toAccount}, is that correct?`;
        session.context = CONTEXT_SENDING;
        session.context_data = {
          amount,
          toAccount,
          fromAccount
        };
        return new fbTemplate.button(message)
          .addButton('Yes', CONTEXT_SENDING_YES)
          .addButton('No', CONTEXT_SENDING_NO)
          .get()

      }
      else {
        return Promise.resolve(`Hi ${firstName}, seem you want to transfer money, but can you add more detail like [send to {account} {amount} idr by current account]? :)`);
      }
    } else if (numbers.length == 1){
      const amount = numbers[0];
      const namePart = sentence.substring(toIndex);
      const name = this._extractName(namePart);
      if (name) {
        return this._findUserToSendMoney(name, amount, session);
      }
      return Promise.resolve(`Hi ${firstName}, seem you want to transfer money, but can you add more detail like [send to {account} {amount} idr by current account]? :)`);
    } else {
      return Promise.resolve(`Hi ${firstName}, seem you want to transfer money, but can you add more detail like [send to {account} {amount} idr by current account]? :)`);
    }
  }

  _findUserToSendMoney(name, amount, session) {
    return api.findUser(name).then(data => {
      if (data.length > 1) {
        const receivers = data;
        session.context = CONTEXT_SENDING_SELECT_USER;
        session.context_data = { amount, receivers };

        const list = new fbTemplate.List();

        for(const receiver of receivers) {
          const { profile: { avatarUrl, firstName, lastName, phone, email, username } } = receiver;
          list
            .addBubble(`${firstName} ${lastName}`, `${phone} ${email}`)
            .addImage(avatarUrl)
            .addButton('Send', 'PICK_' + username)
        }


        return list.get();
      } else if (data.length === 1) {
        session.context = CONTEXT_SENDING_SELECT_USER_ACCOUNTS;
        const receiver = data[0];
        const { profile: { avatarUrl, firstName, lastName, phone, email, username }, accounts } = receiver;
        session.context_data = { amount, receiver };

        const list = new fbTemplate.List();

        for(const account of accounts) {
          const { accountNumber } = account;
          list
            .addBubble(`${accountNumber}`, `${firstName} ${lastName} ${phone} ${email}`)
            .addImage(avatarUrl)
            .addButton('Send', 'PICK_' + username)
        }

        return list.get();
      }
    });
  }

  runReplyCommand(message, session) {
    session.context = null;
    if (message === CONTEXT_SENDING_YES.toLowerCase()) {
      const { amount, toAccount, fromAccount } = session.context_data;
      const command = {
        noun: ''
      };

      return api
        .transferAmount(fromAccount, toAccount, amount)
        .then(data => `Transferred money to account ${toAccount} already. good luck with it!`)
        .catch(data => `Seem account ${toAccount} doesn't exists. Please help checking it again.`);
    }
    return Promise.resolve('You choose cancel transfer money.')
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