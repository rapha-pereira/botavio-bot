// Here we define utils methods or functions.

var Utils = {
  checkIfArray: function(obj) {
    if (Array.isArray(obj)) {
      return true
    }
    else {
      return false
    }  
  },
  
  normalizeString: function(input) {
    return input.trim().toLowerCase();
  },

  parseBRDate: function(input) {
    const dateTimeParts = input.split(' ');

    if (dateTimeParts.length > 2) {
      throw new Error("Invalid date-time format. Please use 'dd/mm/yyyy HH:mm:ss'.");
    }

    const datePart = dateTimeParts[0];
    const timePart = dateTimeParts[1] || "00:00:00";

    const dateParts = datePart.split('/');
    const timeParts = timePart.split(':');

    if (dateParts.length !== 3 || timeParts.length !== 3) {
      throw new Error("Invalid date-time format. Please use 'dd/mm/yyyy HH:mm:ss'.");
    }

    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);

    if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      throw new Error("Invalid date-time format. Please use 'dd/mm/yyyy HH:mm:ss'.");
    }

    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);

    return dateObject;
  },

  dateSentinel: function() {
    let actualDate = new Date();
    let actualDay = actualDate.getDate();
    let actualMonth = actualDate.getMonth() + 1;
    let actualYear = actualDate.getFullYear();
    let actualDateFormatedString = Utilities.formatDate(actualDate, "Americas_Sao Paulo", "dd/MM/yyyy");

    return {
      actDT: actualDate,
      actDTString: actualDateFormatedString,
      actDay: actualDay, 
      actMonth: actualMonth, 
      actYear: actualYear
    }
  },

  // Maybe can be useful in the future //
  // Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
  
  // arrayToCSV: function (dataArray) {
  //   return dataArray.map(row =>
  //     row
  //     .map(String)  // convert every value to String
  //     .map(v => v.replaceAll('"', '""'))  // escape double quotes
  //     .map(v => `"${v}"`)  // quote it
  //     .join(',')  // comma-separated
  //   ).join('\r\n');  // rows starting on new lines
  // },

  actualTimeStamp: function() {
    return Utilities.formatDate(new Date(), "Americas_Sao Paulo", "dd_MM_yyyy_HH_mm_ss");
  },
}

// Source: http://stackoverflow.com/questions/497790
var datesUtil = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //   an array     : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //   an object    : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1]-1,d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}
