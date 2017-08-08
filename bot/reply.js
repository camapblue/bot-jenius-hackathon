/*jshint esversion: 6 */

'use strict';

const co = require('co');
const excuse = require('huh');
const fbTemplate = require('claudia-bot-builder').fbTemplate;
const AIRules = require('./AIRules');
const rules = new AIRules('./data/rules.json');
const fbReply = require('../service/fbService');
const constant = require('../utils/constant');

function aiReply(sender, text) {
  return co(function*() {
    const reply = yield rules.match(text);

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

module.exports = function botReply(message) {
  const { sender, text } = message;

  typingOn(sender);  

  return aiReply(sender, text);
};
