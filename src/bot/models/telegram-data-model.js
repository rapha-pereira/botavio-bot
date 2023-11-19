/**
 * Represents a Telegram data model.
 * @class
 */
class TelegramDataModel {
  /**
   * Creates an instance of TelegramDataModel.
   * @constructor
   * @param {object} contents - The contents of the message.
   * @param {number} chatId - The ID of the chat.
   * @param {number} messageId - The ID of the message.
   * @param {string} userFirstName - The first name of the user.
   * @param {string} messageText - The text of the message.
   * @param {number} replyMessageId - The ID of the reply message.
   * @param {object} rawData - The raw data of the message.
   */
  constructor(
    contents,
    chatId,
    messageId,
    userFirstName,
    messageText,
    replyMessageId,
    rawData
  ) {
    this.contents = contents;
    this.chatId = chatId;
    this.messageId = messageId;
    this.userFirstName = userFirstName;
    this.messageText = messageText;
    this.replyMessageId = replyMessageId;
    this.rawData = rawData;
  }
}
