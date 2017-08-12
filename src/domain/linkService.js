import api from '../service/apiClient';
import { fbTemplate } from 'claudia-bot-builder';

const ACTION_LINK = 'link';
const NOUN_ACCOUNT = 'account';

const FRONTEND_URL = 'https://jenius-hackathon-bot-login.herokuapp.com';
const REDIRECT_URI = 'https://b4vritvu47.execute-api.ap-southeast-1.amazonaws.com/latest/facebook?access_token=UrhwukcTj0s';

class LinkService {
  _getAccountLink() {
    const message = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'Link to your Jenius account',
            image_url: FRONTEND_URL + '/linking.png',
            buttons: [{
              type: 'account_link',
              url: FRONTEND_URL + '?redirect_uri=' + encodeURIComponent(REDIRECT_URI)
            }]
          }]
        }
      }
    }; 
    // console.log('Message =', JSON.stringify(message));
    return message;
  }

  runCommand(command) {
    return this._getAccountLink();
  }
}

export default LinkService;