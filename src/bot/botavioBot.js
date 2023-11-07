// Botavio object base class to RULE THEM ALL!

class Botavio {
  constructor() {
    this._utils = Utils;
  }

  _post(payload) {
    const data = {
      "method": "post",
      "payload": payload
    };

    return JSON.parse(UrlFetchApp.fetch(BOT_URL, data));
  }

  setWebhook(webhook) {
    const payload = {
      "method": "setWebhook",
      "url": webhook || WEBAPP_URL_DEV
    }
    return this._post(payload)
  } 

  sendMessage(chatId, text) {
    const payload = {
      "method": "sendMessage",
      'chat_id': chatId || BOT_DEFAULT_GROUP,
      'text': encodeURIComponent(text || DEV_IDIOT_DEFAULT_MESSAGE),
      'parse_mode': "Markdown",
      'disable_web_page_preview': true,
      'disable_notification': true
    };
    return this._post(payload);
  }
}
