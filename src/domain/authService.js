import api from '../service/apiClient';
const transactions = require('../data/transactions.json');

class AuthService {
  runCommand(command) {
    const { username } = command;
    return this._getUser(username);
  }

  _getUser(username) {
    return api.getUser(username).then(data => this._loadTransactions(data));
  }

  _loadTransactions(userData) {
    const { transactions: tranIds } = userData;
    const trans = transactions.filter(t => tranIds.indexOf(t.transactionId) >= 0);
    userData.transactions = trans.sort(t => t.transactionTimestamp);
    return userData;
  }
}

export default AuthService;