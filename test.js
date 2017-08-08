
/*jshint esversion: 6 */

const botReply = require('./bot/reply');
const constant = require('./util/constant');

function test(userChat) {
  const message = {
      text: userChat,
      sender: constant.senders.kingbon
  }
  botReply(message)
  .then((reply) => {
    console.log(reply);
  });
}

var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

function startChatting() {
    constant.isTesting = true;

    rl.setPrompt('guess> ');

    rl.prompt();
    rl.on('line', function(line) {
        if (line === "bye") rl.close();

        test(line);

        rl.prompt();
    }).on('close',function(){
        process.exit(0);
    });
}

startChatting();
