import api from '../service/apiClient';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';
const NOUN_TRANSACTION = 'transaction';
const NOUN_SPENDING = 'spending';

class TransactionService {
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
    const { user, action, noun } = command;
    switch(action) {
      case ACTION_INFO:
        return this._getTopTransaction(user, 10);
        break;
    }
  }
}

export default TransactionService;