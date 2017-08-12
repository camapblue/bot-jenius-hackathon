
import constant from './src/utils/constant';
import botReply from './src/bot/reply';
import MessageService from './src/bot/messageProcessService';

var readline = require('readline');

function test(userChat) {
  const message = {
      text: userChat,
      sender: constant.senders.kingbon
  };
  botReply(message)
  .then((reply) => {
    console.log(reply);
  });
}


var rl = readline.createInterface(process.stdin, process.stdout);

function startChatting() {
    constant.isTesting = true;
    new MessageService().registerUser('cipta');

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
