/**
 * Handles the HTTP POST request.
 * @param {Object} e - The event object containing the request details.
 */
function doPost(e) {
  // Get Botavio queue to wait for any other executions in progress
  const queue = new BotavioQueue();

  // If the queue is free, execute the request
  if (queue.isFreeQueue()) {
    const botavio = new Botavio();
    const handler = new WebhookHandler(e);
    const cache = new BotavioCache();

    const data = handler.handleWebhook();
    if (data != undefined) {
      const botavioRequestModelCached = cache.get(data, true);
      // If the request is not in cache, process it and cache it
      if (botavioRequestModelCached == null) {
        const botavioRequestModel = handler.processMessage(data);
        botavio.sendMessage(botavioRequestModel);
        cache.put(botavioRequestModel);
      } else {
        // If the request is in cache, send the cached response
        botavio.sendMessage(botavioResponseModelCached);
      }
    }

    // Release the queue, freeing it for other executions
    queue.releaseQueue();
  }
}
