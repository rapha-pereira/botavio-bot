/**
 * Represents a handler for webhook requests.
 */
class WebhookHandler {
  /**
   * Constructs a new WebhookHandler instance.
   * @param {Request} request - The request object.
   */
  constructor(request) {
    this.request = request;
    this._middleware = new MessagePreprocessingMiddleware(request);
  }

  /**
   * Handles the webhook request.
   * @returns {TelegramDataModel | undefined} - The Botavio request model or undefined.
   */
  handleWebhook() {
    const telegramData = this._middleware.process();

    if (!telegramData.messageText.startsWith("/")) {
      return undefined;
    } else {
      return telegramData;
    }
  }

  /**
   * Processes the incoming message data.
   * @param {TelegramDataModel} data - The message data.
   * @returns {BotavioRequestModel} - The Botavio request model.
   */
  processMessage(data) {
    const [command, ...args] = data.messageText.split(" ");

    const reportsHandler = new ReportsHandler();
    let report = undefined;

    switch (command) {
      case "/vaiteraula":
        report = reportsHandler.redirectLessonOfDay();
        return new BotavioRequestModel(data, command, report);

      case "/validacao":
        report = reportsHandler.redirectValidations(args);
        return new BotavioRequestModel(data, command, report);

      case "/help":
        report = reportsHandler.redirectHelp();
        return new BotavioRequestModel(data, command, report);

      case "/start":
        /*
          This is needed for new users that interacts with Botavio.
          Telegram bound users to send /start in their first interaction with the Bot.
          Botavio should understand /start the same as /help.
        */
        report = reportsHandler.redirectHelp();
        return new BotavioRequestModel(data, command, report);

      default:
        // Handle unknown commands.
        return new BotavioRequestModel(data, "unknown", report);
    }
  }
}
