class ValidationReport {
  constructor() {
    this._utils = Utils;
  }

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
        (data) => data[0] != ""
                  && data[0] != REPORTS__REQUEST_VALIDATION_TIMESTAMP_COL_NAME // Filter validation sheets header
                  && this._utils
                      .normalizeString(data[1])
                      .includes(validationPersonName) == true
      );
    }

    /*
      In this .filter, we filter validation requests that contains
      a date of request (data[0] != ""), for requests that were made
      by the user requesting the data (data[1] - represented by personName, in this case -)
      and for requests that are in a certain time range (where we use the datesUtil.compare()).
    */
    else {
      return array.filter(
        (data) => data[0] != "" 
                  && data[0] != REPORTS__REQUEST_VALIDATION_TIMESTAMP_COL_NAME // Filter validation sheets header
                  && this._utils
                      .normalizeString(data[1])
                      .includes(validationPersonName) == true
                  && (datesUtil.compare(this._utils.parseBRDate(data[0]), validationDateStart) == 1
                      || datesUtil.compare(this._utils.parseBRDate(data[0]), validationDateStart) == 0)
      );
    }
  }

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
    }

    else {
      return this._handleValidationDataSize(
          this._validationsArrayFilter(
            validationData,
            true,
            validationPersonName
          )
      );
    }
  }

  _getValidationsData(nameToSearch) {
    if (nameToSearch != null) {
      // Fetch validation Sheets data.
      const validationSheetsData = Sheets.Spreadsheets.Values.get(
        REPORTS__REQUEST_VALIDATION_SS_ID, 
        REPORTS__REQUEST_VALIDATION_SHEET_NAME, 
        {
          valueRenderOption: 'UNFORMATTED_VALUE',
          dateTimeRenderOption: 'FORMATTED_STRING'
        }
      );

      return validationSheetsData["values"]
    }

    else {
      return undefined;
    }
  }

  _handleValidationDataSize(validationsData) {
    const validationsDataMapped = validationsData.map(
      x => REQUEST_VALIDATION_RESPONSE_MESSAGE(
        x[1], // Validation requester name
        x[0], // Validation date
        x[2], // Validation course
        x[4], // Validation type
        x[5], // Validation subject to validate
        x[8], // Validation status
      )
    )
    const validationsDataString = validationsDataMapped.join(
      "\n-------------------------\n"
    );

    // If the data is small, we send it as a text type.
    if (validationsData.length < 8) {
      return {
        "reportType": "text",
        "reportData": validationsDataString
      }
    }

    // If the data is large, we send it as a "file" type.
    else {
      return {
        "reportType": "file",
        "reportData": validationsDataString
      }
    }
  }

  report(byDateOf, nameToSearch) {
    // Declaring necessary vars
    const validationPersonName = this._utils.normalizeString(nameToSearch);
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
      )
    }
    
    return undefined
  }
}
