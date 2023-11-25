/**
 * Handles the HTTP POST request.
 * @param {Object} e - The event object containing the request details.
 */
function doPost(e) {
  // Security check - https://github.com/rapha-pereira/BotavioBot/issues/22
  const securityChecker = SecurityChecker;

  if (securityChecker.isTelegramWebhook(e)) {
    // Get Botavio queue to wait for any other executions in progress
    const queue = new BotavioQueue();

    // If the queue is free, execute the request
    if (queue.isFreeQueue()) {
      // Calls Botavio and webhook handler
      const botavio = new Botavio();

      const handler = new WebhookHandler(e);
      const response = handler.handleWebhook();

      // Send response to Telegram if it exists
      if (response != undefined) {
        botavio.sendMessage(response);
      }

      // Release the queue, freeing it for other executions
      queue.releaseQueue();
    }
  }
}
