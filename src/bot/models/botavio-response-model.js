/**
 * Represents a Botavio request model.
 * @class
 */
class BotavioRequestModel {
  /**
   * Represents a BotavioResponseModel.
   * @constructor
   * @param {TelegramDataModel} telegramData - The TelegramDataModel object.
   * @param {string} command - The command string.
   * @param {any} report - The report data.
   */
  constructor(telegramData, command, report) {
    this.telegramData = telegramData;
    this.command = command;
    this.report = report;
  }
}
