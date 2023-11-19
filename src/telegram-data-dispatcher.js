function doPost(e) {
  // Get Botavio queue to wait for any other executions in progress
  const queue = new BotavioQueue();

  if (queue.isFreeQueue()) {
    const botavio = new Botavio();

    const handler = new WebhookHandler(e);
    const response = handler.handleWebhook()

    if (response != undefined) {
      botavio.sendMessage(response);
    }

    queue.releaseQueue()
  }
}
