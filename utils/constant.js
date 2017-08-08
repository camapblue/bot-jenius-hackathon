const ACCESS_TOKEN = 'EAASTRYFJ6pMBADdDnovcHX6D85ABYjBwrQkxgqKceHcltGqLvuh7uW4wvNQXARaxPNwowsNbjCbYzZBp2wmjghFkNsZBtUDBFxDyvGiqeC7lTC03mtMHmeJjdpZBSAAqUYtGAt857tQaumUSZA5tGKQ8FgOItcoHYJxcN2TIJQZDZD';

const FACEBOOK_SENDER_ID_FOR_TESTING = {
  kingbon: '1471812739522327'
}

let IS_TESTING = false;

module.exports.accessToken = ACCESS_TOKEN;
module.exports.senders = FACEBOOK_SENDER_ID_FOR_TESTING;
module.exports.isTesting = IS_TESTING;