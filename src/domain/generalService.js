import api from '../service/apiClient';


const NOUN_EXCHANGE_RATE = 'exchangeRate';
const NOUN_SAVING_RATE = 'savingRate';
const NOUN_OVER_SPENDING = 'over_spending';

class GeneralService {
  constructor() {
    this.genericInfo = {
      savingRate: {
        maxiSaver: '6.25%',
        flexiSaver: '5%',
        dreamSaver: '5%',
      },
      exchangeRate: {
        USD_IDR : '13,370.00',
        USD_VND : '22,230.00',
        IDR_VND : '178,430.00',
      }
    }
  }

  _getCurrentBalance(user) {
    const { profile } = user;
    if (!profile) return Promise.resolve('Please link to Jenius account first.');

    const { firstName } = profile;

    const account = user.accounts.find(a => a.type === 'PRIMARY_ACCOUNT');
    const balance = toIDRCurrency(account.balance);
    return Promise.resolve(`Hi ${firstName}, your Active Balance is ${balance} ${account.currency} 👍`);
  }

  _getOverSpendingInfo(user) {
    const account = user.accounts.find(a => a.type === 'PRIMARY_ACCOUNT');
    const dailySpending = Math.round((account && account.balance) ? (account.balance / 15) : 233000);
    return Promise.resolve(`You spend too much on food & drinks, especially Starbucks☕☕☕ and Menya Sakura 🍕🍕🍕It will be wise if you limit yourself to only spend daily ${dailySpending} IDR for the rest of the months 💪`);
  }

  getExchangeRate() {
    const { exchangeRate: { USD_IDR, USD_VND, IDR_VND } } = this.genericInfo;
    const message = `Here is what I know:

🇺🇸 USD - 🇮🇩 IDR: ${USD_IDR}
🇺🇸 USD - 🇻🇳 VND: ${USD_VND}
🇮🇩 IDR - 🇻🇳 VND: ${IDR_VND}
`;
    return Promise.resolve(message)
  }

  getSavingInfo() {
    const { savingRate: { maxiSaver, flexiSaver } } = this.genericInfo;
    const message = `I'm glad you ask this, this is one of the big benefit on using Jenius! 💰

Flexi & Dream Saver flat rate is ${flexiSaver} p.a.
Maxi Saver maximum rate is ${maxiSaver}% p.a.`;

    return Promise.resolve(message)
  }

  runCommand(command) {
    const { user, action, noun } = command;
    switch(noun) {
      case NOUN_EXCHANGE_RATE:
        return this.getExchangeRate();
        break;

      case NOUN_SAVING_RATE:
        return this.getSavingInfo();
        break;

      case NOUN_OVER_SPENDING:
        return this._getOverSpendingInfo(user);

    }
  }
}

export default GeneralService;