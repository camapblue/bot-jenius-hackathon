import api from '../service/apiClient';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';

const NOUN_TRANSFER = 'spending';

class TransferService {
  _getCurrentBalance(user) {
    const { profile: { lastName } } = user;

    const account = user.accounts.find(a => a.type === 'PRIMARY_ACCOUNT');
    return Promise.resolve(`Hi ${lastName}, your Active Balance is ${account.balance} ${account.currency} 👍`);
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

export default TransferService;