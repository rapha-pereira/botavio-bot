/**
 * Represents a Telegram data model.
 * @class
 */
class TelegramDataModel {
    constructor(contents, chatId, messageId, userFirstName, messageText, replyMessageId, rawData) {
        this.contents = contents;
        this.chatId = chatId;
        this.messageId = messageId;
        this.userFirstName = userFirstName;
        this.messageText = messageText;
        this.replyMessageId = replyMessageId;
        this.rawData = rawData;
    }
}