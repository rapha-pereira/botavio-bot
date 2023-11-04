function doPost(e) {
  // Get Botavio queue to wait any other executions in progress
  const queue = new BotavioRequestsQueue();

  if (queue.isFreeQueue()) {
    const botavio = new Botavio();

    const postData = JSON.parse(e.postData.contents);
    const chatId = UtilsTelegram.getChatId(postData);
    const receivedMessage = UtilsTelegram.normalizeCommandsStr(postData.message.text);
    
    switch(receivedMessage) {
      case '/help':
        return botavio.sendMessage(chatId, HELP_MESSAGE);

      case '/vaiteraula':
        return Utils.checkCache("REPORTS__LESSON_OF_DAY")
    
    }
    const tt = botavio.setWebhook("https://script.google.com/macros/s/AKfycbyI_d4JVnZFd-OKFn5O0rnCzs0CXLO-KK_FlqBvG0DeQ1A2s4gE1-xl7gS8-WK-3N4/exec")

    queue.releaseQueue()
  }
  else{
    console.log("fail")
  }
}

function funtst() {
  const regex = /^\/[^@\s]+(@[^@\s]+)?$/;
  const strings = [
    "/help@BotavioBot",
    "/validacao",
    "/validacao@BotavioBot",
    "/another_command",
  ];

  strings.forEach((str) => {
    if (regex.test(str)) {
      console.log(`Matched: ${str}`);
    } else {
      console.log(`Not matched: ${str}`);
    }
  });


}
