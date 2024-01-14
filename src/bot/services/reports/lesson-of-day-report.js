/**
 * Represents a Lesson of the Day Report.
 */
class LessonOfDayReport {
  /**
   * Constructs a LessonOfDayReport object.
   * @constructor
   */
  constructor() {
    this._utils = Utils;
    this._dateSentinel = this._utils.dateSentinel();
  }

  // TODO: Refactor this method.
  /**
   * Retrieves the color of the cell corresponding to today's date.
   * @private
   * @returns {string} The background color of the cell.
   */
  _getTodayCellColor() {
    let currentMonthRow;

    const currentMonthStr =
      REPORTS__CALENDAR_MONTH_INT_TO_STR[this._dateSentinel["actMonth"]];
    const currentDayInt = this._dateSentinel["actDay"];
    const currentMonthRange =
      REPORTS__CALENDAR_MONTH_CELLS_RANGE[currentMonthStr];
    const currentMonthValues =
      REPORTS__CALENDAR_SHEET.getRange(currentMonthRange).getValues();
    const columnOfCurrentDay = currentMonthValues[0].indexOf(currentDayInt) + 1; // +1 because range starts at 0

    if (currentMonthRange.split(":")[0].length > 2) {
      currentMonthRow = currentMonthRange.slice(1, 3);
    } else {
      currentMonthRow = currentMonthRange.slice(1, 2);
    }

    return REPORTS__CALENDAR_SHEET.getRange(currentMonthRow, columnOfCurrentDay)
      .getCell(1, 1)
      .getBackground();
  }

  /**
   * Generates the Lesson of the Day report.
   * @returns {Object} The report object containing the report type and data.
   */
  report() {
    const cellColor = this._getTodayCellColor();
    return {
      reportType: "text",
      reportData: String(REPORTS__CALENDAR_HEX_MAP[cellColor]),
    };
  }
}
