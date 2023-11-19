/**
 * A helper to do some transformations on data received from Telegram.
 */
var UtilsTelegram = {
  JSONParser: function (strToParse) {
    let parsedObject;
    try {
      parsedObject = JSON.parse(strToParse);
    } catch {
      // If parsing fails, consider it as already an object
      parsedObject = strToParse;
    }
    return parsedObject;
  },

  getChatId: function (messageObj) {
    return messageObj.message.chat.id;
  },

  getReplyMessageId: function (messageObj) {
    return messageObj.message.message_id;
  },

  normalizeMessage: function (str) {
    // Remove everything after @ and @ itself
    return str.trim().toLowerCase().replace(/@.*/, "");
  },
};
