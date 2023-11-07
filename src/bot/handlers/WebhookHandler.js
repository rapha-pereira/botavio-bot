class WebhookHandler {
  constructor(request) {
    this.request = request;
    this._middleware = new MessagePreprocessingMiddleware(request);
  }

  handleWebhook() {
    Logger.log(`WebhookHandler - Telegram request received`);
    const telegramDataModel = this._middleware.process();
    return this._processTelegramMessage(telegramDataModel)
  }

  /**
   * Processes a Telegram message and calls the appropriate handler based on the command.
   * @param {TelegramDataModel} data - The message data object.
   */
  _processTelegramMessage(data) {
    Logger.log(`WebhookHandler - Telegram request processed`);
    // Split the message text into command and arguments
    const [command, ...args] = data.messageText.split(' ');

    const reportsHandler = new ReportsHandler();
    let report;

    switch (command) {
      case '/vaiteraula':
        report = reportsHandler.redirectLessonOfDay();
        return {
          data,
          command,
          report
        }

      case '/validacao':
        report = reportsHandler.redirectValidations(args)
        return {
          data,
          command,
          report
        }

      default:
        // Handle unknown commands.
        return {
          data,
          command: "unknown",
          report
        }
    }
  }
}
