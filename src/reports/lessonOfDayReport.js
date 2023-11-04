
class LessonOfDayReport {
    constructor() {
      this._utils = Utils;
      this._dateSentinel = this._utils.dateSentinel();
      this._constants = GeneralConstants;
    }
  
    _getTodayCellColor() {
      let currentMonthRow;
  
      const currentMonthStr = this._constants.MONTHS_INT_TO_STR[this._dateSentinel["actMonth"]];
      const currentDayInt = this._dateSentinel["actDay"];
      const currentMonthRange = this._constants.MONTHS_CELLS_RANGE[String(currentMonthStr)];
      const currentMonthValues = this._constants.CALENDAR_SHEET.getRange(currentMonthRange).getValues(); 
      const columnOfCurrentDay = currentMonthValues[0].indexOf(currentDayInt) + 1; // +1 because range starts at 0
  
      if(currentMonthRange.split(":")[0].length > 2) {
        currentMonthRow = currentMonthRange.slice(1, 3);
      }
      else {
        currentMonthRow = currentMonthRange.slice(1, 2);
      }
  
      return this._constants.CALENDAR_SHEET.getRange(
          currentMonthRow, columnOfCurrentDay
        ).getCell(1, 1).getBackground()
    }
  
    report() {
      const cellColor = this._getTodayCellColor();
      return this._utils.saveCache(
        String(
          this._constants.CALENDAR_HEX_MAPPING[cellColor]
        )
      );
    }
  }
  