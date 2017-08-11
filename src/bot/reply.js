import AIRules from './AIRules';
import constant from '../utils/constant';
import MessageService from './MessageProcessService';

const co = require('co');
const excuse = require('huh');
const fbTemplate = require('claudia-bot-builder').fbTemplate;

// const rules = new AIRules('./src/data/rules.json');

const fbReply = require('../service/fbService');

const messageProcessor = new MessageService();
function aiReply(sender, text) {
  return co(function*() {
    const reply = yield messageProcessor.process(text);

    typingOff(sender);

    return reply;
  });
}

function typingOn(sender) {
  if (constant.isTesting) {
    console.log('typing...');
    return;
  }
  const message = new fbTemplate.ChatAction('typing_on').get();
  fbReply(sender, message, constant.accessToken);
}

function typingOff(sender) {
  if (constant.isTesting) {
    return;
  }
  const message = new fbTemplate.ChatAction('typing_off').get();
  fbReply(sender, message, constant.accessToken);
}

const botReply = message => {
  const { sender, text } = message;

  typingOn(sender);  

  return aiReply(sender, text);
};

export default botReply;
