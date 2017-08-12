import api from '../service/apiClient';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';

const NOUN_BALANCE = 'balance';
const NOUN_TRANSACTION = 'transaction';
const NOUN_SPENDING = 'spending';

class AccountService {
  _getCurrentBalance(user) {
    const account = user.accounts.find(a => a.type === 'PRIMARY_ACCOUNT');
    return Promise.resolve(`Your current balance account is ${account.balance} ${account.currency}`);
  }

  _sendMoney(user, toAccount, amount) {
    return Promise.resolve(`You want to send ${amount} to bank account ${toAccount}? Correctly?`);
  }

  runCommand(command) {
    const { user, action, noun } = command;
    switch(action) {
      case ACTION_INFO:
        return this._getCurrentBalance(user);
        break;

      case ACTION_SEND:
        return this._sendMoney(user, '90010000521', 5000);
        break;
    }
  }
}

export default AccountService;