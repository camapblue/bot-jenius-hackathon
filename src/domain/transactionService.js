import api from '../service/apiClient';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';
const NOUN_TRANSACTION = 'transaction';
const NOUN_SPENDING = 'spending';

class TransactionService {
  _processTransaction(command) {
    const { user, action, noun } = command;
    switch(action) {
      case ACTION_INFO:
        return this._getTopTransaction(user, 10);
        break;

      case ACTION_SEND:
        return this._sendMoney(user, '90010000521', 5000);
        break;
    }
  }

  _getTopTransaction(user,number) {
    const transactions = user.transactions.slice(0, number);

    let content = 'Your transaction is: \n';
    let index = 1;
    for(let transaction of transactions) {
      const { category: { name }, debitCredit, accountNumber, amount, fee } = transaction;

      content +=  `${index}. ${name} from ${accountNumber}(_${debitCredit}_) ${amount} idr (fee: ${fee} idr) \n`;
      index++;
    }

    return Promise.resolve(content);
  }

  runCommand(command) {
    const { noun } = command;

    switch(noun) {
      case NOUN_TRANSACTION:
        return this._processTransaction(command);
        break;
    }
  }
}

export default TransactionService;