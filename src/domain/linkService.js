import api from '../service/apiClient';

const ACTION_LINK = 'link';
const NOUN_ACCOUNT = 'account';

const FRONTEND_URL = 'https://jenius-hackathon-bot-login.herokuapp.com/';

class LinkService {
  _getAccountLink() {
    return JSON.stringify({
      facebook: {
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
      } 
    });
  }

  runCommand(command) {
    const { action, noun } = command;

    switch(action) {
      case ACTION_LINK:
        return this._getAccountLink();
        break;
    }
  }
}

export default LinkService;