/**
 * Represents a Telegram data model.
 * @class
 */
class TelegramDataModel {
    constructor(contents, chatId, messageId, username, messageText, rawData) {
        this.contents = contents;
        this.chatId = chatId;
        this.messageId = messageId;
        this.username = username;
        this.messageText = messageText;
        this.rawData = rawData;
    }
}