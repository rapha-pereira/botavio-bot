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
    this.utils = UtilsTelegram;
    this.data = data;
  }

  process() {
    // Extract properties from objects using destructuring.
    const contents = this.utils.JSONParser(this.data.postData.contents);
    const chatId = this.utils.getChatId(contents);
    const messageId = contents.message.message_id;
    const userFirstName = contents.message.from.first_name;
    const messageText = this.utils.normalizeMessage(contents.message.text);
    const replyMessageId = this.utils.getReplyMessageId(contents);

    return new TelegramDataModel(
      contents,           // Object
      chatId,             // Number (Integer)
      messageId,          // Number (Integer)
      userFirstName,      // String
      messageText,        // String
      replyMessageId,     // Number (Integer)
      this.data           // Object
    );
  }
}
