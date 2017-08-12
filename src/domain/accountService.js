import api from '../service/apiClient';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';

const NOUN_BALANCE = 'balance';
const NOUN_SAVING = 'saving';
const NOUN_TRANSACTION = 'transaction';
const NOUN_ACCOUNT = 'account';

class AccountService {
  _getCurrentBalance(user) {
    const { profile: { firstName } } = user;

    const account = user.accounts.find(a => a.type === 'PRIMARY_ACCOUNT');
    return Promise.resolve(`Hi ${firstName}, your Active Balance is ${account.balance} ${account.currency} 👍`);
  }

  _sendMoney(user, toAccount, amount) {
    return Promise.resolve(`You want to send ${amount} to bank account ${toAccount}? Correctly?`);
  }

  _getAllSaving(user) {
    const { profile: { firstName } } = user;
    const accountsStr = user.accounts.map(a => `\n - Account "${a.name}" is ${a.balance} ${a.currency}`).join('');
    return Promise.resolve(`Hi ${firstName}, ${accountsStr} 👍`);
  }

  _getAllAccount(user) {
    const { profile: { firstName } } = user;
    const accountsStr = user.accounts.map(a => `\n - Account "${a.name}" is ${a.balance} ${a.currency}`).join('');
    return Promise.resolve(`Hi ${firstName}, ${accountsStr} 👍`);
  }

  runCommand(command) {
    const { user, action, noun } = command;

    switch(noun) {
      case NOUN_BALANCE:
        switch(action) {
          case ACTION_INFO:
            return this._getCurrentBalance(user);
            break;

          case ACTION_SEND:
            return this._sendMoney(user, '90010000521', 5000);
            break;
        }
      break;

      case NOUN_ACCOUNT:
        switch(action) {
          case ACTION_INFO:
            return this._getAllAccount(user);
            break;

          case ACTION_SEND:
            return this._sendMoney(user, '90010000521', 5000);
            break;
        }
        break;

      case NOUN_SAVING:
        switch(action) {
          case ACTION_INFO:
            return this._getAllSaving(user);
            break;

          case ACTION_SEND:
            return this._sendMoney(user, '90010000521', 5000);
            break;
        }
        break
    }
  }
}

export default AccountService;