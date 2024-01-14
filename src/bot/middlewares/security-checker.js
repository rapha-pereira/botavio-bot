/**
 * SecurityChecker is a utility object that provides methods for checking security-related conditions.
 */
const SecurityChecker = {
  /**
   * Checks if the request is a valid Telegram webhook.
   * @param {Object} e - The request object.
   * @returns {boolean} - Returns true if the request is a valid Telegram webhook, otherwise false.
   */
  isTelegramWebhook: function (e) {
    const headers = e.parameter;
    try {
      const token = headers["X-Telegram-Bot-Api-Secret-Token"];
      if (token == WEBHOOK_SECRET_TOKEN) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.warn("SecurityChecker.isTelegramWebhook: " + e);
      return false;
    }
  },
};
