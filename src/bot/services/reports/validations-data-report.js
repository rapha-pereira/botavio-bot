/**
 * Represents a Validation Report.
 * @class
 */
class ValidationReport {
  /**
   * Represents a ValidationDataReport object.
   * @constructor
   */
  constructor() {
    this._utils = Utils;
  }

  /**
   * Filters an array of validation requests based on specified criteria.
   * @private
   * @param {Array} array - The array of validation requests.
   * @param {boolean} isOnlyFilter - Indicates whether to apply only person name filter or also date range filter.
   * @param {string} validationPersonName - The person name to filter by.
   * @param {string} validationDateStart - The start date of the date range to filter by.
   * @returns {Array} - The filtered array of validation requests.
   */
  _validationsArrayFilter(
    array,
    isOnlyFilter,
    validationPersonName,
    validationDateStart
  ) {
    /*
      In this .filter, we filter validation requests that contains
      a date of request (data[0] != "") and for requests that were made
      by the user requesting the data (data[1] - represented by personName, in this case -).
    */
    if (isOnlyFilter == true) {
      return array.filter(
        (data) =>
          data[0] != "" &&
          data[0] != REPORTS__REQUEST_VALIDATION_TIMESTAMP_COL_NAME && // Filter validation sheets header
          this._utils.normalizeString(data[1]).includes(validationPersonName) ==
            true
      );
    } else {
      /*
      In this .filter, we filter validation requests that contains
      a date of request (data[0] != ""), for requests that were made
      by the user requesting the data (data[1] - represented by personName, in this case -)
      and for requests that are in a certain time range (where we use the datesUtil.compare()).
    */
      return array.filter(
        (data) =>
          data[0] != "" &&
          data[0] != REPORTS__REQUEST_VALIDATION_TIMESTAMP_COL_NAME && // Filter validation sheets header
          this._utils.normalizeString(data[1]).includes(validationPersonName) ==
            true &&
          (datesUtil.compare(
            this._utils.parseBRDate(data[0]),
            validationDateStart
          ) == 1 ||
            datesUtil.compare(
              this._utils.parseBRDate(data[0]),
              validationDateStart
            ) == 0)
      );
    }
  }

  /**
   * Finds validations based on the provided criteria.
   * @private
   * @param {Array} validationData - The array of validation data.
   * @param {string} validationPersonName - The name of the person to filter by.
   * @param {Date} validationDateStart - The start date to filter by.
   * @returns {Array} - The filtered array of validations.
   */
  _findValidations(validationData, validationPersonName, validationDateStart) {
    if (validationDateStart != null) {
      return this._handleValidationDataSize(
        this._validationsArrayFilter(
          validationData,
          false,
          validationPersonName,
          validationDateStart
        )
      );
    } else {
      return this._handleValidationDataSize(
        this._validationsArrayFilter(validationData, true, validationPersonName)
      );
    }
  }

  /**
   * Retrieves the validation data from the specified sheet.
   * @private
   * @param {string} nameToSearch - The name to search for.
   * @returns {Array|undefined} - The validation data or undefined if nameToSearch is null.
   */
  _getValidationsData(nameToSearch) {
    if (nameToSearch != null) {
      // Fetch validation Sheets data.
      const validationSheetsData = Sheets.Spreadsheets.Values.get(
        REPORTS__REQUEST_VALIDATION_SS_ID,
        REPORTS__REQUEST_VALIDATION_SHEET_NAME,
        {
          valueRenderOption: "UNFORMATTED_VALUE",
          dateTimeRenderOption: "FORMATTED_STRING",
        }
      );

      return validationSheetsData["values"];
    } else {
      return undefined;
    }
  }

  /**
   * Handles the validation data size and determines the report type.
   * @private
   * @param {Array} validationsData - The array of validation data.
   * @returns {Object} - The report type and data.
   */
  _handleValidationDataSize(validationsData) {
    const validationsDataMapped = validationsData.map((x) =>
      REQUEST_VALIDATION_RESPONSE_MESSAGE(
        x[1], // Validation requester name
        x[0], // Validation date
        x[2], // Validation course
        x[4], // Validation type
        x[5], // Validation subject to validate
        x[8] // Validation status
      )
    );
    const validationsDataString = validationsDataMapped.join(
      "\n-------------------------\n"
    );

    // If the data is small, we send it as a text type.
    if (validationsData.length < 8) {
      return {
        reportType: "text",
        reportData: validationsDataString,
      };
    }

    // If the data is large, we send it as a "file" type.
    else {
      return {
        reportType: "file",
        reportData: validationsDataString,
      };
    }
  }

  /**
   * Generates a report based on the provided parameters.
   * @param {string} byDateOf - The date to filter the report by.
   * @param {string} nameToSearch - The name to search for in the report.
   * @returns {undefined|Array} - The generated report or undefined if no data is available.
   */
  report(byDateOf, nameToSearch) {
    // Declaring necessary vars
    const validationPersonName = this._utils.normalizeString(nameToSearch);

    // If the name is empty, we return undefined since the search would be too broad.
    if (validationPersonName == "" || validationPersonName == null) {
      return undefined;
    }

    let validationDateStart;
    try {
      validationDateStart = this._utils.parseBRDate(byDateOf);
    } catch {
      validationDateStart = undefined;
    }

    const validationsData = this._getValidationsData(validationPersonName);

    if (validationsData != null) {
      return this._findValidations(
        validationsData,
        validationPersonName,
        validationDateStart
      );
    }

    return undefined;
  }
}
