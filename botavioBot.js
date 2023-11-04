// Botavio object base class to send messages and post data with a payload

class Botavio {
  constructor() {
    this._utils = Utils;
    this._constants = BotavioConstants;
  }

  _post(payload) {
    const data = {
      "method": "post",
      "payload": payload
    };

    return this._utils.jsonParser(
      UrlFetchApp.fetch(this._constants.BOT_URL, data)
    );
  }

  setWebhook(webhook) {
    const payload = {
      "method": "setWebhook",
      "url": webhook || this._constants.WEBAPP_PROD_URL
    }
    return this._post(payload)
  } 

  sendMessage(chatId, text) {
    const payload = {
      "method": "sendMessage",
      'chat_id': getChatId(chatId) || this._constants.DEFAULT_GROUP,
      'text': encodeURIComponent(text || this._constants.DEV_IDIOT_DEFAULT_MESSAGE),
      'parse_mode': "Markdown",
      'disable_web_page_preview': true,
      'disable_notification': true
    };
    return this._post(payload);
  }
}
