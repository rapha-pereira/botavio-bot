// Heavily inspired by: https://github.com/yinonavraham/GoogleAppsScripts/tree/master/EnhancedCacheService

/**
 * BotavioCache - A wrapper for a native Cache object with additional features.
 *
 * This class enhances the functionality of a native Cache object by providing methods
 * to store and retrieve various data types (string, number, boolean, and object) in the cache.
 * It also supports splitting and merging large string values to work within cache size limits.
 *
 * @param {Cache} cache - The native Cache object to enhance.
 * @constructor
 */

class BotavioCache {
  /**
   * Creates a new BotavioCache instance.
   * 
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
   * @param {boolean} castReturnToModel - If the cache return, if not null, should be casted to BotavioRequestModel 
  */
  get(key, castReturnToModel) {
    const getData = this._handleGet(key);
    if (getData != null && castReturnToModel === true) {
      return 
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
   * @param {string | null} getData 
   * @param {Object} modelToParse 
   */
  _parseGetDataToModel(getData, modelToParse) {
    return Object.assign(new modelToParse, JSON.parse(getData))
  }
}
