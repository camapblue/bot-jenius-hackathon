import api from '../service/apiClient';
const transactions = require('../data/transactions');

class AuthService {
  runCommand(command) {
    const { username, sender } = command;
    return this._getUser(username).then(data => this._saveData(sender, data));
  }

  _saveData(sender, userData) {
    const postData = {
      id: sender,
      data: {
        user: userData,
        context: null
      }
    };

    return api.saveData(postData);
  }

  _getUser(username) {
    return api.getUser(username);
  }

  getData(sender) {
    return api.getData(sender);
  }

  _loadTransactions(userData) {
    const { transactions: tranIds } = userData;
    const trans = transactions.filter(t => tranIds.indexOf(t.transactionId) >= 0);
    userData.transactions = trans.sort(t => t.transactionTimestamp);
    return userData;

  }
}

export default AuthService;