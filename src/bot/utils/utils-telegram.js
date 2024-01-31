/**
 * A helper to do some transformations on data received from Telegram.
 */
const UtilsTelegram = {
  JSONParser(strToParse) {
    let parsedObject;
    try {
      parsedObject = JSON.parse(strToParse);
    } catch {
      // If parsing fails, consider it as already an object
      parsedObject = strToParse;
    }
    return parsedObject;
  },

  getChatId(messageObj) {
    return messageObj.message.chat.id;
  },

  getReplyMessageId(messageObj) {
    return messageObj.message.message_id;
  },

  normalizeMessage(str) {
    // Remove everything after @ and @ itself
    return str.trim().toLowerCase().replace(/@.*/, '');
  },
};
