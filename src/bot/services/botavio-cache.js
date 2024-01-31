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
   * Put a Botavio request into cache.
   * @param {BotavioRequestModel} model - Botavio request model.
   * @param {boolean} castReturnToModel - Cast the return to BotavioRequestModel.
  */
  get(key, castReturnToModel) {
    const getData = this._handleGet(key);
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
    const expInSeconds = 21600; // 6 hours
    const key = model.telegramData.messageText
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
    return this._cache.get(model.messageText);
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
