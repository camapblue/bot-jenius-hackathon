import constant from '../utils/constant';
import MessageService from './messageProcessService';

import { fbTemplate } from 'claudia-bot-builder';

const fbReply = require('../service/fbService');

const messageProcessor = new MessageService();

const aiReply = (sender, text) => {
  return messageProcessor.process(text, sender)
  .then((reply) => {
    typingOff(sender);
    return reply;
  });
};

const typingOn = (sender) => {
  if (constant.isTesting) {
    console.log('typing...');
    return;
  }
  const message = new fbTemplate.ChatAction('typing_on').get();
  fbReply(sender, message, constant.accessToken);
};

const typingOff = (sender) => {
  if (constant.isTesting) {
    return;
  }
  const message = new fbTemplate.ChatAction('typing_off').get();
  fbReply(sender, message, constant.accessToken);
};

const registerLoggedInUser = (username, sender) => {

};

const botReply = message => {
  const { sender, text } = message;

  typingOn(sender);

  if (text.length > 0) {
    return aiReply(sender, text);
  }
  
  const { originalRequest : { account_linking } } = message;
  if (!account_linking) return Promise.resolve('Why do you say nothing ?');

  const { status, authorization_code } = account_linking;
  if (status === 'linked') {
    return messageProcessor.registerUser(authorization_code, sender)
      .then(i => `Hi ${authorization_code}, you've linked to Jenius account successful.`);
  }
};

export default botReply;
