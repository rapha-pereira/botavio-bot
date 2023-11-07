/**
 * MessagePreprocessingMiddleware - A middleware to handle telegram messages received by Botavio.
 *
 * This class prepares the Telegram data to what Botavio handlers expects.
 * Its use case is simple and should only make simple transformations to the raw data.
 *
 * @param {object} data - The data as JS Object of the Telegram data received.
 * @constructor
 */

class MessagePreprocessingMiddleware {
  /**
   * Creates a new MessagePreprocessingMiddleware instance.
   *
   * @param {object} data - The data as JS Object of the Telegram data received.
   */
  constructor(data) {
    this.data = data;
    this.utils = UtilsTelegram;
  }

  process() {
    Logger.log(`MessagePreprocessingMiddleware - Processing data`);

    // Extract properties from objects using destructuring.
    const { contents } = this.utils.JSONParser(this.data.postData.contents);
    const chatId = this.utils.getChatId(contents);
    const messageId = contents.message.message_id;
    const username = contents.message.from.username;
    const messageText = this.utils.normalizeMessage(contents.message.text);

    Logger.log(`MessagePreprocessingMiddleware - Processed message ${messageId}`);

    return new TelegramDataModel({
      contents,           // Object
      chatId,             // Number (Integer)
      messageId,          // Number (Integer)
      username,           // String
      messageText,        // String
      rawData: this.data  // Object
    });
  }
}
