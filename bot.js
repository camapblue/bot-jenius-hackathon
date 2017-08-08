/*jshint esversion: 6 */

'use strict';

const botBuilder = require('claudia-bot-builder');
const botReply = require('./bot/reply');

/*
  Token:
  EAASTRYFJ6pMBADdDnovcHX6D85ABYjBwrQkxgqKceHcltGqLvuh7uW4wvNQXARaxPNwowsNbjCbYzZBp2wmjghFkNsZBtUDBFxDyvGiqeC7lTC03mtMHmeJjdpZBSAAqUYtGAt857tQaumUSZA5tGKQ8FgOItcoHYJxcN2TIJQZDZD
  App secret: ba6022f5ea09dec455dfd78c7798539d

  For lambda create => MUST UPDATE verify_URL & verify_token
*/

const api = botBuilder((message) => {
  return botReply(message);
});

module.exports = api;
