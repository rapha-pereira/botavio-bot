// Here we define utils for telegram methods or functions.

var UtilsTelegram = {
  /**
   * Get the chat ID from a Telegram message object.
   * @param {Object} messageObj - The Telegram message object.
   * @returns {number|null} - The chat ID or null if not found.
   */
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

  normalizeCommandsStr: function (str) {
    // Remove everything after @ and @ itself
    return str.trim().toUpperCase().replace(/@.*/, "");
  }
}
