/**
 * BotavioCache - A Botavio-version of Google CacheService.
 * @constructor
 */

class BotavioCache {
  /**
   * Creates a new BotavioCache instance.
   */
  constructor() {
    this._cache = CacheService.getScriptCache();
  }

  // Public methods
  /**
   * Put a Botavio request into cache.
   * @param {BotavioRequestModel} model - Botavio request model.
   */
  put(model) {
    if (typeof model != BotavioRequestModel) {
      throw Error("A wrong data type was passed to CacheService.")
    }
    else {
      this._handlePut(model)
    }
  }

  /**
   * Get a Botavio request from cache.
   * @param {TelegramDataModel} model - TelegramDataModel model.
   * @param {boolean} castReturnToModel - If cast the return to BotavioRequestModel.
  */
  get(model, castReturnToModel) {
    const getData = this._handleGet(model);
    if (getData != null && castReturnToModel === true) {
      return this._parseStrToModel(getData, BotavioRequestModel);
    }
    else {
      return getData
    }
  }

  // Private methods
  /**
   * @private
   * @param {BotavioRequestModel} model
   * @returns {void}
   */
  _handlePut(model) {
    GmailApp.sendEmail("raphael.pg@aluno.ifsc.edu.br", "BotavioCache", JSON.stringify(model))
    const expInSeconds = 21600; // 6 hours
    const key = this._createKey(model);
    const value = JSON.stringify(model)
    return this._cache.put(
      key,
      value,
      expInSeconds
    );
  }

  /**
   * @private
   * @param {TelegramDataModel} model
   * @returns {string | null}
   */
  _handleGet(model) {
    const key = this._createKey(model);
    return this._cache.get(key);
  }

  /**
   * @private
   * @param {TelegramDataModel | BotavioRequestModel} model
   * @returns {string}
   */
  _createKey(model) {
    if (typeof model == TelegramDataModel) {
      return model.messageText;
    }
    if (typeof model == BotavioRequestModel) {
      return model.telegramData.messageText;
    }
  }

  /**
   *
   * @param {string} string
   * @param {Object} modelToParse
   */
  _parseStrToModel(getData, modelToParse) {
    return Object.assign(new modelToParse, JSON.parse(getData))
  }
}
