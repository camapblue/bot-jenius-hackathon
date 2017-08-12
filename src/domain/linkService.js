import api from '../service/apiClient';
import { fbTemplate } from 'claudia-bot-builder';

const ACTION_LINK = 'link';
const NOUN_ACCOUNT = 'account';

const FRONTEND_URL = 'https://jenius-hackathon-bot-login.herokuapp.com/';

class LinkService {
  _getAccountLink() {
    const message = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'Welcome to Account Linking',
            image_url: FRONTEND_URL + '/linking.png',
            buttons: [{
              type: 'account_link',
              url: FRONTEND_URL
            }]
          }]
        }
      }
    }; 
    console.log('Message =', message);
    return message;
  }

  runCommand(command) {
    return this._getAccountLink();
  }
}

export default LinkService;