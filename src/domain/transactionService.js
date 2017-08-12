import api from '../service/apiClient';

const ACTION_SEND = 'send';
const ACTION_INFO = 'info';
const NOUN_TRANSACTION = 'transaction';
const NOUN_SPENDING = 'spending';

class TransactionService {

  _getInfo(command) {
    let number = 10;

    const { user, sentence } = command;
    const numbers = sentence.match(/\d+/);
    if (numbers && numbers.length > 0) {
      number = numbers[0];
    }

    return number;
  }

  _getTopTransaction(user, number) {
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
    const { user, action } = command;
    switch(action) {
      case ACTION_INFO:
        const number = this._getInfo(command);
        return this._getTopTransaction(user, number);
        break;
    }
  }
}

export default TransactionService;