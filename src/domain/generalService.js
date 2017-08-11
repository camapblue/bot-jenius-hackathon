import api from '../service/apiClient';


const NOUN_EXCHANGE_RATE = 'exchangeRate';
const NOUN_SAVING_RATE = 'savingRate';

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

  getExchangeRate() {
    const { exchangeRate: { USD_IDR, USD_VND, IDR_VND } } = this.genericInfo;
    const message = `The current exchange rate: \n USD - IDR: ${USD_IDR}\n USD - VND: ${USD_VND}\n IDR - VND: ${IDR_VND}`;

    return Promise.resolve(message)
  }

  getSavingInfo() {
    const { savingRate: { maxiSaver, flexiSaver, dreamSaver } } = this.genericInfo;
    const message = `The saving rate: \n - Maxi Saver: ${maxiSaver}\n - Flexi Saver: ${flexiSaver}\n - Dream Saver: ${dreamSaver}`;

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

    }
  }
}

export default GeneralService;