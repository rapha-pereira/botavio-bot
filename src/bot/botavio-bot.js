/**
 * Represents a Botavio bot.
 */
class Botavio {
  /**
   * Creates a new instance of the Botavio bot.
   * @constructor
   */
  constructor() {
    this._utils = Utils;
  }

  /**
   * Sets the webhook URL for the bot.
   * @param {string} webhook - The webhook URL to set.
   * @returns {boolean} - True if the webhook was set successfully.
   */
  setWebhook(webhook) {
    const payload = {
      method: "setWebhook",
      url: webhook,
    };
    return this._post(payload);
  }

  /**
   * Sends the content to Telegram through Botavio.
   * @param {BotavioRequestModel} data - The message data.
   * @returns {boolean} - True if the message was sent successfully.
   */
  sendMessage(data) {
    // Create payload initial object
    const payload = {
      chat_id: String(data.telegramData.chatId),
      reply_to_message_id: String(data.telegramData.messageId),
      parse_mode: "Markdown",
      disable_web_page_preview: true,
      disable_notification: false,
    };

    // Handle received data
    if (typeof data.report == 'undefined' && !data.report) {
      // If there is no report, send an error default message
      payload.method = "sendMessage";
      payload.text = REQUEST_UNKNOWN_ERROR_MESSAGE;
    } else {
      const reportType = data.report.reportType;

      if (reportType == "text") {
        payload.method = "sendMessage";
        payload.text = data.report.reportData;
      }

      if (reportType == "file") {
        payload.method = "sendDocument";
        payload.caption = REQUEST_RESPONSE_TOO_LARGE_MESSAGE;
        payload.document = this._getTextBlobFromData(data);
      }

      if (!reportType == "text" && !reportType == "file") {
        /*
        If, for some reason, the report type is not recognized 
        or neither is implemented, send an error default message.
        We log this action if it happens, cause it's not supposed to.
        */
        console.warn(
          `Report type not recognized or implemented. Check the code. Report type: ${reportType}`
        );
        payload.method = "sendMessage";
        payload.text = REQUEST_UNKNOWN_ERROR_MESSAGE;
      }
    }

    // Send data to Telegram
    return this._post(payload);
  }

  /**
   * Returns a text blob from the given data.
   * @param {Object} data - The data object.
   * @returns {Blob} The text blob.
   * @private
   */
  _getTextBlobFromData(data) {
    const currentTimestamp = this._utils.actualTimeStamp();
    return Utilities.newBlob(
      data.report.reportData,
      "text/plain",
      `botavio_data_${currentTimestamp}.txt`
    );
  }

  /**
   * Sends a POST request to the Telegram API.
   * @param {object} payload - The payload to send.
   * @returns {boolean} - True if the request was sent successfully.
   * @private
   */
  _post(payload) {
    const data = {
      method: "post",
      payload: payload,
    };

    UrlFetchApp.fetch(BOT_URL, data);

    return true;
  }
}
