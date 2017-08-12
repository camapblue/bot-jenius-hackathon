import AIRules from './AIRules';
import constant from '../utils/constant';
import MessageService from './messageProcessService';

import { fbTemplate } from 'claudia-bot-builder';

const fbReply = require('../service/fbService');

const messageProcessor = new MessageService();

const aiReply = (sender, text) => {
  return messageProcessor.process(text)
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

const botReply = message => {
  const { sender, text } = message;

  typingOn(sender);

  return aiReply(sender, text);
};

export default botReply;
