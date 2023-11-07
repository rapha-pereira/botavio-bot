/**
 * A helper to do some transformations on data received from Telegram.
 */

var UtilsTelegram = {
  JSONParser: function(strToParse) {
    let parsedObject;
    try {
      parsedObject = JSON.parse(strToParse);
    } catch (error) {
      // If parsing fails, consider it as already an object
      parsedObject = strToParse;
    }
    return parsedObject;
  },

  getChatId: function (messageObj) {
    // Check if messageObj is falsy or null and return null
    if (!messageObj) return null;

    // Determine the chat type based on the message or callback_query
    const chatType = (messageObj.message || messageObj.callback_query?.message)?.chat.type;

    // Check if chatType is 'supergroup'
    if (chatType === 'supergroup') {
      // Return the chat ID if it's a supergroup, or null if not found
      return (messageObj.message || messageObj.callback_query?.message)?.chat.id || null;
    } else {
      // Return the user's ID if it's not a supergroup, or null if not found
      return (messageObj.message || messageObj.callback_query?.message)?.from.id || null;
    }
  },

  normalizeMessage: function (str) {
    // Remove everything after @ and @ itself
    return str.trim().toUpperCase().replace(/@.*/, "");
  }
}
